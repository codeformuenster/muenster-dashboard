#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os
import datetime as dt

# import pandas as pd
from bs4 import BeautifulSoup
import csv
from elasticsearch import Elasticsearch


def main():

    elastic = Elasticsearch()

    with open('stillplaetze.csv', 'r') as csvfile:
        spamreader = csv.reader(
            csvfile,
            delimiter=','
        )
        for row in spamreader:
            name = row[0]
            address = row[1]
            desc = row[2]
            lat = row[3]
            lon = row[4]

            print(', '.join(row))

            output = {
                "name": name,
                "slug": name.toLowerCase().replace(" ", "-"),
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

            res = elastic.index(index="other", doc_type='place', body=output)
            print(res)


if __name__ == '__main__':
    main()
