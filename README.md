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


## Importing data

    # Aufgrabungen und similar things
    See README in `import-scripts`

    # Wn events and news, and stadt münster webcams:
    See README in `import-scripts/wn-events-news-cams`


## Running only the react app

    sudo docker-compose stop dashboard

    npm run start


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
 - babychange = Wickelplätze
 - container = Recycling Container


## Indexes

 - WN News:  https://elasticsearch.codeformuenster.org/news/_search
 - Alle locations (Aufgrabungsmeldungen, Kindergärten, etc..): places
 - WN Events: events
 - Stadtteile geojson shapes: stadtteile


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcodeformuenster%2Ffamilien-dashboard.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcodeformuenster%2Ffamilien-dashboard?ref=badge_large)
