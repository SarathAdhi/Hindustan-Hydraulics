FROM node:19-alpine3.16
WORKDIR /app
COPY package.json .
RUN npm install --quiet
RUN npm i nodemon -g
# RUN apt update
# RUN apt install openssl -y
# RUN openssl genrsa -out private.pem 2048
# RUN openssl rsa -in private.pem -outform PEM -pubout -out public.pem
COPY . .