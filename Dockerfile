### STAGE 1:BASE ###
FROM node:lts-alpine AS base

WORKDIR /app

ARG VITE_BASE="/"
ARG VITE_API_BASE_URL

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY . /app

### STAGE 2:BUILD ###
FROM base AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile && \
    pnpm run build

### STAGE 3:DEPLOY ###
FROM nginx:alpine AS deploy

ARG VITE_BASE="/"

COPY --from=build /app/dist /usr/share/nginx/html${VITE_BASE}

COPY ./nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]