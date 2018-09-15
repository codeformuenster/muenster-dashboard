# Import WFS to Elasticsearch


cd mapping \
  && sudo docker-compose up && cd ..

cd districts \
  && sudo docker-compose up && cd ..

cd geojsonwfs \
  && sudo docker-compose up && cd ..

cd various \
  && python3 stillplaetze.py && cd ..

cd various \
  && python3 container.py && cd ..

---
[old]

Before doing anything, you should do:
- fill the `config.json` file in their respective directories with life
  - `url`: the URL to the WFS 1.1.0 aufgrabungen server
  - `eSurl`: the URL to the Elasticsearch server with index and type
  - `baseUrl`: the URL stump to the WFS 2.0.0 for everything else
- run `yarn` in the respective directories before executing the scripts

## `districts`
Inserts the districts into an elasticsearch index indexed with `geo_shape`

## `aufgrabungen`
Inserts the construction sites into the places index. Execute with `node aufgrabungen-to-elasticsearch.js`

## `geojsonwfs`
Inserts the following feature classes into the places index.
- pool
- agencies
- bookbus
- library
- cemetery
- wc
- wifi
- school
- playground
- sport
- kindergarden

Execute with `node index.js`

## `sportstaetten-belegungsplan`
Inserts the booking plans of sports facilities in Münster. You need to pass the environment parameter `GOOGLE_API_KEY` (Google Maps API key) when running the import script `import_hallenbelegung.py`

## `container`
To update the JSON file with new container data to the following:
- Go to https://overpass-turbo.eu
- Execute the script:
[out:json][timeout:25];
// gather results
(
  // query part for: “"recycling:glass"=yes”
  node["recycling:glass"="yes"]({{bbox}});
  way["recycling:glass"="yes"]({{bbox}});
  relation["recycling:glass"="yes"]({{bbox}});
);
// print results
out body;
>;
out skel qt;
- Find the JSON in the "data" tab
