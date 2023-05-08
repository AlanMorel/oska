FROM node:20.1.0-alpine as base

RUN apk add --update --no-cache openssl1.1-compat

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY . .

ENV NODE_ENV production

CMD ["pnpm", "start"]