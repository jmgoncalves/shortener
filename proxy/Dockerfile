FROM nginx

# copy nginx conf
COPY nginx.conf .
RUN mv nginx.conf /etc/nginx/conf.d/

ENTRYPOINT ["nginx", "-g", "daemon off;"]
