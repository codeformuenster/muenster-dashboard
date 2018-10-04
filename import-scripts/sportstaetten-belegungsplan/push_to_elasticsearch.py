#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os
from elasticsearch import Elasticsearch

DIR = 'target/'

def main():
    es = Elasticsearch()

    for jsonfile in os.listdir(DIR):
        print(jsonfile)
        data = json.load(open(DIR + jsonfile))

        res = es.index(index="places", doc_type='place', body=data)
        print(res)


if __name__ == '__main__':
    main()
