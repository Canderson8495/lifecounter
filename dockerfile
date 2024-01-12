FROM node:18-alpine

WORKDIR /lifecounter

COPY public/ /lifecounter/public
COPY src/ /lifecounter/src
COPY package.json /lifecounter/

RUN npm install

RUN npm run build

RUN ls -latrc 


RUN npm install -g serve


CMD [ "npm", "run", "prod"]