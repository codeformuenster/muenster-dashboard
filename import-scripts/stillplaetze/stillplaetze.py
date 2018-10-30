#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import csv
import re
from elasticsearch import Elasticsearch


def main():
    """The class's docstring"""

    elasticsearch_url, index_prefix = os.environ['ELASTICSEARCH_URL_PREFIX'].rsplit("/", maxsplit=1)
    elastic = Elasticsearch(elasticsearch_url)

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

            res = elastic.index(index=f"{index_prefix}places", doc_type='_doc', id=slug, body=output)
            print(res)


if __name__ == '__main__':
    main()
