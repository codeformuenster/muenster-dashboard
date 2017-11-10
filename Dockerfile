FROM node:9.0-alpine
RUN npm install --global yarn create-react-app

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

CMD [ "npm", "run", "start" ]
