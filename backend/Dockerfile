FROM node:14.19.0-alpine as build
WORKDIR /usr/src/app
# Install deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
# Copy source
COPY . ./
RUN yarn build


FROM node:14.19.0-alpine as deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile


FROM node:14.19.0-alpine
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules/
COPY --from=build /usr/src/app/dist ./dist/
ENV NODE_ENV=prod

EXPOSE 4001 8080
CMD ["yarn", "prod"]