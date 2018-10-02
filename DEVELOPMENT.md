# Developer Information

Here you will find some things that we might want to remember, 
but that are too specific to be put into readme.md. 

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

