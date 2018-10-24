# Import Stillplaetze to Elasticsearch

It will use local elasticsearch on port 9200 by default.

Run it with:

    # install required python libraries
    pip3 -r requirements.txt

    # import data into elasticsearch
    python3 stillplaetze.py

Check your local elasticsearch database with:

    # List all indexes
    http://localhost:9200/_aliases

    # Show contents of index (indexname = "other")
    http://localhost:9200/other/_search


You can start a local elasticseach by running the docker-compose in the main dir.

After you exit docker compose, run elasticsearch and the application with auto compile feature:

    sudo docker start $container-id-of-ES

    npm run start
