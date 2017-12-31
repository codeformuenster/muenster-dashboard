FROM node:8-alpine as build

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build

FROM golang as packer

RUN go get github.com/ubergesundheit/assets-server/cmd/as-builder

COPY --from=build /usr/src/app/build /assets

RUN as-builder -debug -src /assets -dest /assets-server -port 8080 -url /

FROM scratch

COPY --from=packer /assets-server /assets-server

CMD ["/assets-server"]
