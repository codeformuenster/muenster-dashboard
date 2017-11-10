FROM node:9.0-alpine
RUN npm install --global yarn create-react-app

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
# RUN yarn install
RUN npm install

COPY . /usr/src/app
# RUN yarn build

# CMD [ "yarn", "start" ]
CMD [ "npm", "run", "start" ]


# FROM node:9.0-alpine
# RUN npm install --global yarn
# WORKDIR /usr/src/app/build
# COPY --from=0 /usr/src/app/build .
#
# RUN yarn global add serve
# CMD [ "serve", "-s", "build" ]
