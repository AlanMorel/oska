FROM node:alpine as base

WORKDIR /app

COPY package.json yarn.lock ./

RUN npx browserslist@latest --update-db && rm -rf node_modules && yarn install --frozen-lockfile && yarn cache clean --force

COPY . .

RUN yarn build

CMD ["node", "./dist/Bot.js"]

FROM base as production
