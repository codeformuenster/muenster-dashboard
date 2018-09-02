
Für aufgrabungen ist die url https://www.stadt-muenster.de/ows/mapserv621/odaufgrabserv?REQUEST=GetFeature&SERVICE=WFS&VERSION=1.1.0&TYPENAME=aufgrabungen&OUTPUTFORMAT=csv&EXCEPTIONS=XML&SRSNAME=EPSG:4326

für den rest ist die url https://www.stadt-muenster.de/ows/mapserv706/ oder vielleicht auch ohne den letzten /



sudo docker run -ti -v $PWD:$PWD -v $PWD/node_modules -w $PWD node:9-alpine sh
