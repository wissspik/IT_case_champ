FROM nginx:alpine

WORKDIR /app

RUN rm -f /etc/nginx/conf.d/default.conf

COPY frontend/build /usr/share/nginx/html

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
