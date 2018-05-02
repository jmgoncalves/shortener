FROM node

# copy
COPY package-lock.json /home/node
COPY package.json /home/node
COPY src /home/node/src
COPY public /home/node/public

# install dependencies
RUN npm install --prefix /home/node

# test and build static site
ENV CI=true
RUN npm test --prefix /home/node
RUN npm run build --prefix /home/node

# install nginx
RUN apt update
RUN apt install -y nginx

# copy nginx conf
COPY nginx.conf .
RUN mv nginx.conf /etc/nginx/conf.d/

ENTRYPOINT ["nginx", "-g", "daemon off;"]
