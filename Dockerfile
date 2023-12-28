FROM node:19

WORKDIR /usr/app

COPY npm-shrinkwrap.json .
COPY package.json .

RUN npm install --production

COPY . .

RUN apt-get update && \
    apt-get install -y sqlite3

RUN sqlite3 database.db < sql/create.sql && \
    sqlite3 database.db < sql/insert.sql

EXPOSE 8080

CMD [ "npm", "run", "start" ]