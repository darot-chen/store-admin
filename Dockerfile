FROM node:18.15.0 AS builder

WORKDIR /builder

ARG NUXT_PUBLIC_ENV
ARG NUXT_PUBLIC_API_URL
ARG NUXT_PUBLIC_APP_NAME
ARG NUXT_PUBLIC_BUCKET_URL

COPY . .
RUN yarn install
RUN yarn generate

FROM nginx:alpine as production
COPY --from=builder ./builder/.output/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf