FROM nginx:alpine

# удаляем дефолтный конфиг
RUN rm /etc/nginx/conf.d/default.conf

# копируем SPA-конфиг, который лежит в frontend/config
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# копируем собранную статику из frontend/build
COPY frontend/build/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
