#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
from bs4 import BeautifulSoup
import json
import os
from pprint import pprint

import datetime as dt

import geopy

from geopy.geocoders import GoogleV3
from geopy.exc import GeocoderTimedOut

def main():
    geolocator = GoogleV3(api_key=os.environ['GOOGLE_API_KEY'])

    with open("source/belper.xml", 'rb') as fp:
        soup = BeautifulSoup(fp, "xml")

        for facility in soup.find_all('Einrichtung'):
            output = {
                "name": facility.Name.text,
                "type": "Sporthalle"
            }

            properties = { }

            facility_number = facility.Nummer.text

            with open("source/einr.xml", 'rb') as fp_einr:
                soup_einr = BeautifulSoup(fp_einr, 'xml')

                number_tag = soup_einr.find('Nummer', text=facility_number)
                print(number_tag.text)
                output["description"] = number_tag.find_next_sibling('Typ').text
                properties["construction_year"] = number_tag.find_next_sibling('Baujahr').text

                location = number_tag.parent.find('FunktionKey', text='SSA')
                if location:
                    street = location.parent.Strasse.text
                    zip = location.parent.Plz.text
                    city = location.parent.Ort.text

                    address_string = street + ', ' + zip + ' ' + city

                    output["address"] = {
                        "street": street,
                        "zip": zip,
                        "city": city
                    }

                    locator = geolocator.geocode(address_string, timeout=10)

                    geo = {
                        "lat": locator.latitude if locator else '',
                        "lon": locator.longitude if locator else ''
                    }

                    output["address"]["geo"] = geo

            properties['allocations'] = []

            for allocation in facility.find_all('Belegung'):
                day = allocation.Wochentag.text
                day_long = get_full_day_name(day)

                start = allocation.Start.text.replace('24:', '0:')
                start_time = dt.datetime.strptime(start, '%H:%M').time()
                start_time_float = start_time.hour+start_time.minute/60.0

                end = allocation.Ende.text.replace('24:', '0:')
                end_time = dt.datetime.strptime(end, '%H:%M').time()
                end_time_float = end_time.hour+end_time.minute/60.0

                activity = allocation.Taetigkeit.text
                field = allocation.Bereich.text
                club = allocation.find('Nutzer-Nutzergruppen').text
                comment = allocation.Kommentar1.text
                segment = allocation.SegName.text

                properties['allocations'].append({
                    "time": day + ' ' + start + '-' + end,
                    "x-time-es": {
                        "day": day_long,
                        "start": start_time_float,
                        "end": end_time_float
                    },
                    "segment": segment,
                    "activity": activity,
                    "field": field,
                    "club": club,
                    "comment": comment
                })
            output["properties"] = properties

            with open('target/sportstaette_' + number_tag.text + '.json', 'w') as outfile:
                json.dump(output, outfile)

        # df = pd.DataFrame(json).drop_duplicates(keep='first')
        # print(df)

def get_full_day_name(day_abbr):
    mapping_table = {
        'Mo': 'Montag',
        'Di': 'Dienstag',
        'Mi': 'Mittwoch',
        'Do': 'Donnerstag',
        'Fr': 'Freitag',
        'Sa': 'Samstag',
        'So': 'Sonntag'
    }
    return mapping_table[day_abbr]


if __name__ == '__main__':
    main()

