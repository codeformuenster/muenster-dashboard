#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import csv
import datetime as dt
import json
import math
import os
import re

from elasticsearch import Elasticsearch
import pandas as pd


def main():
    elastic = Elasticsearch(os.environ['ELASTICSEARCH_URL'])

    df = pd.read_json('container.json')

    containers = []

    for idx, row in df.iterrows():
        container = {}
        container['slug'] = 'container-%s' % str(idx + 1)
        container['name'] = 'Recycling-Container'
        container['type'] = 'container'
        if type(row.tags) != float:
            container['properties'] = row.tags
        container['address'] = {}

        if type(row.tags) != float:
            if 'addr:street' in row.tags:
                street = row.tags['addr:street']
                del container['properties']['addr:street']

                if 'addr:housenumber' in row.tags:
                    street += ' ' + row.tags['addr:housenumber']
                    del container['properties']['addr:housenumber']

                container['address']['street'] = street
            if 'addr:city' in row.tags:
                city = row.tags['addr:city']
                del container['properties']['addr:city']
                container['address']['city'] = city
            if 'addr:postcode' in row.tags:
                postcode = row.tags['addr:postcode']
                del container['properties']['addr:postcode']
                container['address']['zip'] = postcode
            if 'addr:country' in row.tags:
                del container['properties']['addr:country']

        if not (math.isnan(row.lat) and math.isnan(row.lon)):
            container['address']['geo'] = {}
            container['address']['geo']['lat'] = row.lat
            container['address']['geo']['lon'] = row.lon

        print(container)
        res = elastic.index(index=f"{os.environ['ELASTICSEARCH_INDEX_PREFIX']}places", doc_type='_doc', id=container['slug'], body=container)
        print(res)


if __name__ == '__main__':
    main()
