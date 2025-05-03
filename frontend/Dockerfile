FROM nginx:alpine

WORKDIR /app

RUN rm /etc/congif/conf.d/default.conf

COPY build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
