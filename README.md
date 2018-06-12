[![Dependency Status](https://gemnasium.com/codeformuenster/familien-dashboard.svg)](https://gemnasium.com/codeformuenster/familien-dashboard)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcodeformuenster%2Ffamilien-dashboard.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcodeformuenster%2Ffamilien-dashboard?ref=badge_shield)

This project was bootstrapped with
https://github.com/Microsoft/TypeScript-React-Starter

Current uptime status for mein-ms.de: https://uptime.codeformuenster.org/

## Installing

    npm install

## Running elasticsearch and the react dev tool

    sudo docker-compose up

If you get problems with file permissions on startup, check that the mounted directory ./elasticsearch/data has correct permissions.

Great Elasticsearch JS documentation is linked here: https://github.com/elastic/elasticsearch-js



## Running only the react app

    npm run start


# Initialize the Database

    cd src/scripts
    ../../node_modules/typescript/bin/tsc initialize-database.ts && node ./initialize-database.js  

## Importing data

    # Aufgrabungen und similar things
    See README in `import-scripts`

    # Wn events and news, and stadt münster webcams:
    See README in `import-scripts/wn-events-news-cams`


## Deployment auf Ubuntu 16.04

- User einrichten wie hier beschrieben:
  https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04
- npm installieren:
  https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04



    sudo apt-get install docker

## Data "type"-category values
 - construction = Baustellen
 - pool = Bäder
 - playground = Spielplätze
 - wifi = WLAN
 - kindergarden = Kitas
 - wc = WCs
 - sport = Sportstätte
 - webcam = Webcams


## Indexes

 - WN News:  https://elasticsearch.codeformuenster.org/news/_search
 - Alle locations (Aufgrabungsmeldungen, Kindergärten, etc..): places
 - WN Events: events
 - Stadtteile geojson shapes: stadtteile


## Playing with the data

Open kibana:

    http://localhost:5601/

  go to "dev-tools"

  enter this:

    PUT /locations
    {
      "mappings": {
        "restaurant": {
          "properties": {
            "times": {
              "type": "nested"
            },
            "address": {
              "properties": {
                "geo": {
                  "type": "geo_point"
                }
              }
            }
          }
        }
      }
    }

  add sample location:

    PUT /locations/restaurant/1?pretty
    {
      "name": "Cafe Extrablatt",
      "food": ["Burger", "Pizza", "Wraps"],
      "times": [
        {
          "type": "lunch",
          "day": "monday",
          "start": 660,
          "end": 780
        },
        {
          "type": "lunch",
          "day": "tuesday",
          "start": 660,
          "end": 780
        },
        {
          "type": "lunch",
          "day": "wednesday",
          "start": 660,
          "end": 780
        },
        {
          "type": "lunch",
          "day": "thursday",
          "start": 660,
          "end": 780
        },
        {
          "type": "lunch",
          "day": "friday",
          "start": 660,
          "end": 780
        },
        {
          "type": "happy_hour",
          "day": "friday",
          "start": 1200,
          "end": 1260
        },
        {
          "type": "happy_hour",
          "day": "saturday",
          "start": 1200,
          "end": 1260
        }
      ],
      "payment_methods": ["cash", "debit_card", "credit_card"],
      "wifi": false,
      "url": "https://cafe-extrablatt.de/speisekarte",
      "address": {
        "street": "Salzstraße",
        "house_number": "7",
        "zip_code": "48143",
        "city": "Münster",
        "geo": {
          "lat": 51.9622843,
          "lon": 7.6278623
        }
      },
      "phone_number": "025144445"
    }

    PUT /locations/restaurant/2?pretty
    {
      "name": "Der silberne Löffel",
      "type": ["Restaurant"],
      "food": ["Pasta", "Pizza"],
      "times": [
        {
          "type": "lunch",
          "day": "tuesday",
          "start": 705,
          "end": 840
        },
        {
          "type": "lunch",
          "day": "wednesday",
          "start": 705,
          "end": 840
        },
        {
          "type": "lunch",
          "day": "thursday",
          "start": 705,
          "end": 840
        },
        {
          "type": "lunch",
          "day": "friday",
          "start": 705,
          "end": 840
        },
        {
          "type": "lunch",
          "day": "friday",
          "start": 705,
          "end": 840
        },
        {
          "type": "lunch",
          "day": "saturday",
          "start": 705,
          "end": 840
        }
      ],
      "payment_methods": ["cash", "debit_card", "credit_card"],
      "wifi": false,
      "url": "https://i.imgur.com/QwsmbNb.jpg",
      "address": {
        "street": "Überwasserstraße",
        "house_number": "3",
        "zip_code": "48143",
        "city": "Münster",
        "geo": {
          "lat": 51.965230,
          "lon": 7.620721
        }
      },
      "phone_number": "+49251392045"
    }

  query for all locations which offer happy hours and only show times of type happy hour:

    GET /locations/restaurant/_search
    {
      "_source": {
        "includes": [ "*" ],
        "excludes": [ "times" ]
      },
      "query": {
        "nested": {
          "path": "times",
          "inner_hits": {
            "_source": [
              "times", "type"
            ]
          },
          "query": {
            "bool": {
              "must": [
                {
                  "term": {
                    "times.type": "happy_hour"
                  }
                }
              ]
            }
          }
        }
      }
    }


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcodeformuenster%2Ffamilien-dashboard.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcodeformuenster%2Ffamilien-dashboard?ref=badge_large)
