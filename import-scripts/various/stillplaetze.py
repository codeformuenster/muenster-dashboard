#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os
import datetime as dt
import csv
import re

# import pandas as pd
# from bs4 import BeautifulSoup

from elasticsearch import Elasticsearch


def main():
    """The class's docstring"""

    elastic = Elasticsearch()

    with open('stillplaetze.csv', 'r') as csvfile:
        spamreader = csv.reader(
            csvfile,
            delimiter=','
        )
        for row in spamreader:
            name = row[0].strip()
            address = row[1].strip()
            desc = row[2].strip()
            lat = row[3].strip()
            lon = row[4].strip()
            slug = re.sub('[^a-z]', '_', name.lower())

            print(', '.join(row))

            output = {
                "name": name,
                "slug": slug,
                "type": "Wickelraum",
                "description": desc,
                "address": {
                    "street": address,
                    # "zip": 48145,
                    "city": "Münster",
                    "geo": {
                        "lat": lat,
                        "lon": lon
                    }
                }
            }

            print(output)

            res = elastic.index(index="other", doc_type='place', id=slug, body=output)
            print(res)


if __name__ == '__main__':
    main()
