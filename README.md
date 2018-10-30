[![Dependency Status](https://gemnasium.com/codeformuenster/familien-dashboard.svg)](https://gemnasium.com/codeformuenster/familien-dashboard)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcodeformuenster%2Ffamilien-dashboard.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcodeformuenster%2Ffamilien-dashboard?ref=badge_shield)


## Run development environment locally

```bash
export COMPOSE_PROJECT_NAME="familiendashboard"
# export ELASTICSEARCH_URL="http://elasticsearch:9200"
export ELASTICSEARCH_URL="https://elasticsearch.codeformuenster.org"
export ELASTICSEARCH_INDEX_PREFIX="mein-ms-"
export BUILD="--build"

sudo --preserve-env docker-compose up -d
sudo --preserve-env docker-compose logs -f

cd import-scripts
sudo --preserve-env ./import.sh
```


## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcodeformuenster%2Ffamilien-dashboard.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcodeformuenster%2Ffamilien-dashboard?ref=badge_large)
