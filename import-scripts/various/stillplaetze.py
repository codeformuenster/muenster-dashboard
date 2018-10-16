#!/usr/bin/env python3
"""Some docstring"""

# -*- coding: utf-8 -*-

import csv
import re

# import pandas as pd
# from bs4 import BeautifulSoup

from elasticsearch import Elasticsearch


def main():
    """The class's docstring"""

    elastic = Elasticsearch(
        ['elasticsearch.codeformuenster.org'],
        scheme="https",
        port=443)

    # Import into local instance instead
    # elastic = Elasticsearch()

    with open('stillplaetze.csv', 'r') as csvfile:
        spamreader = csv.reader(
            csvfile,
            delimiter=','
        )
        for row in spamreader:
            name = row[0].strip()
            address = row[1].strip()
            place = row[2].strip()
            lat = row[3].strip()
            lon = row[4].strip()
            slug = re.sub('[^a-z]', '_', name.lower())
            placetype = row[5].strip()
            source = row[6].strip()
            desc = row[7].strip()

            print(', '.join(row))

            output = {
                "name": name,
                "slug": slug,
                "type": "babychange",
                "description": placetype,
                "address": {
                    "street": address,
                    # "zip": 48145,
                    "city": "Münster",
                    "geo": {
                        "lat": lat,
                        "lon": lon
                    }
                },
                "properties": {
                    "Stockwerk": place,
                    "Beschreibung": placetype,
                    "Quelle": source,
                    "Hinweis": desc
                }
            }

            print(output)

            res = elastic.index(
                index="places",
                doc_type='place',
                id=slug,
                body=output)
            print(res)


if __name__ == '__main__':
    main()
