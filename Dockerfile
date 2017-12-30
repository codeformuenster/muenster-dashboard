FROM node:8-alpine as build

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build

FROM golang as packer

WORKDIR /go/src/assets-server

COPY --from=build /usr/src/app/build /go/src/assets-server/files
COPY server.go /go/src/assets-server/main.go

RUN go get github.com/rakyll/statik && \
  statik -src=/go/src/assets-server/files && \
  CGO_ENABLED=0 go build -a -tags netgo -ldflags "-extldflags -static" -o /assets-server main.go

FROM scratch

COPY --from=packer /assets-server /assets-server

CMD ["/assets-server"]
