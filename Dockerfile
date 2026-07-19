FROM node:18

WORKDIR /app

RUN npm install -g serve

COPY server.js .
COPY package*.json .
COPY index.html .

RUN npm install

ENV PORT=3000

CMD node server.js & serve -s . -l $PORT
