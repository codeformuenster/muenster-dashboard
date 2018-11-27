[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcodeformuenster%2Fmuenster-dashboard.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcodeformuenster%2Fmuenster-dashboard?ref=badge_shield)

## Run development environment locally

```bash
export COMPOSE_PROJECT_NAME="muenster-dashboard"
export ELASTICSEARCH_URL_PREFIX="http://localhost:9200/mein-ms2-"
export BUILD="--build"

sudo --preserve-env docker-compose up $BUILD
```

If you want to start React in developer mode open another terminal:

```bash
sudo docker container stop muensterdashboard_dashboard_1
export REACT_APP_ELASTICSEARCH_URL_PREFIX="http://localhost:9200/mein-ms2-"
npm start
```

For importing the data open a new terminal:

```bash
export COMPOSE_PROJECT_NAME="muenster-dashboard"
export ELASTICSEARCH_URL_PREFIX="http://elasticsearch:9200/mein-ms2-"
export BUILD="--build"
export MAPQUEST_KEY="<your mapquest key here>"

cd import-scripts
sudo --preserve-env ./import.sh
```

You can leave the mapquest key away, but then no events will be imported.
