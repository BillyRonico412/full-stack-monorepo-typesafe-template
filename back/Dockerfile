FROM node:22-alpine3.19
COPY ./package.json /app/package.json
RUN cd /app && npm install
COPY . /app
WORKDIR /app
CMD npm run prod