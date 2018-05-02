FROM node

RUN cd /home/node

# add dependency spec
COPY package-lock.json .

# install dependencies
RUN npm install

# add sources
COPY src .
COPY public .

# test and build static site
RUN npm test
RUN npm run build

# install nginx
RUN apt update
RUN apt install -y nginx

# copy nginx conf
RUN cp nginx.conf /etc/nginx/conf.d/

ENTRYPOINT ["nginx", "-g", "daemon off;"]
