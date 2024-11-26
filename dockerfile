FROM node:22

WORKDIR /usr/apps

COPY ./package*.json . 

RUN npm install

COPY . .

EXPOSE 8080


CMD ["npm", "run", "start:dev"]
