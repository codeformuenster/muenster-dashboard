FROM node:10.12-alpine

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
# COPY package-lock.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

CMD ["npm", "start"]
