# FROM node:alpine

# WORKDIR /usr/src/app

# COPY . /usr/src/app

# RUN npm install -g @angular/cli

# RUN npm install --legacy-peer-deps


# CMD ["ng", "serve", "--host", "0.0.0.0"]

# Étape 1 : Build Angular
FROM node:alpine as build

WORKDIR /app
COPY . .
RUN npm install --force && ./node_modules/.bin/ng build --configuration production

# Étape 2 : Servir via Nginx
FROM nginx:alpine
COPY --from=build /app/dist/tf-ui/browser  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
