FROM docker.io/node:11.10.1-alpine

ADD ./ /

RUN yarn && yarn build

CMD ["yarn", "prod"]
