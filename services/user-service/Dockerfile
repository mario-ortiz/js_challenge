FROM node:8.9.4-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . .
EXPOSE 3000
CMD ["npm", "start"]