FROM node:alpine as base

RUN apk add --update --no-cache openssl1.1-compat

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY . .

RUN pnpm build

CMD ["node", "./dist/Bot.js"]

FROM base as production
