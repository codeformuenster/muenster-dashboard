#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
from bs4 import BeautifulSoup
import json


def main():
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

                    output["address"] = {
                        "street": street,
                        "zip": zip,
                    "city": city
                }

            for allocation in facility.find_all('Belegung'):
                day = allocation.Wochentag.text
                start = allocation.Start.text
                end = allocation.Ende.text
                activity = allocation.Taetigkeit.text
                field = allocation.Bereich.text
                club = allocation.find('Nutzer-Nutzergruppen').text
                comment = allocation.Kommentar1.text
                segment = allocation.SegName.text

                properties[day + ' ' + start + '-' + end] = {
                    "segment": segment,
                    "activity": activity,
                    "field": field,
                    "club": club,
                    "comment": comment
                }
            output["properties"] = properties

            with open('target/sportstaette_' + number_tag.text + '.json', 'w') as outfile:
                json.dump(output, outfile)


if __name__ == '__main__':
    main()

