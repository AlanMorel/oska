FROM node:alpine as base

RUN apk add --update --no-cache openssl1.1-compat

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY . .

CMD ["sh", "-c", "pnpm cross-env NODE_ENV=production node --loader ts-paths-esm-loader --experimental-specifier-resolution=node ./src/Bot.ts"]

FROM base as production
