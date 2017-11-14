Scrape some information and import to elastic search

# Events scrapen
```bash
./Cli.php scrape:events
```

# News scrapen
```bash
./Cli.php scrape:news
```

# Run scrapers with docker

    docker-compose up -d

It will download some stuff and then say something like:

    # ...
    # Creating datascraper_cli_1

Then you can enter the container with:

    docker exec -ti datascraper_cli_1 bash

Inside the container, on the first run install dependencies:

    composer install

IF you want to change the elasticsearch database url, change this file:

    Indexer/Elasticsearch.php
    
And then you can run the commands to execute the scrapers:

    ./Cli.php scrape:events
    ./Cli.php scrape:news
    ./Cli.php scrape:webcams
