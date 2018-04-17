FROM node:9.11-alpine

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build


FROM quay.io/geraldpape/as-builder:v1

COPY --from=0 /usr/src/app/build /assets
RUN as-builder -debug -src /assets -dest /assets-server -port 8080 -url /


FROM scratch

COPY --from=1 /assets-server /assets-server
CMD ["/assets-server"]
