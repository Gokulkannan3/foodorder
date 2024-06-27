FROM node:14-alpine

WORKDIR /src

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]
