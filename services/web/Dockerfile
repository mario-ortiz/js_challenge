FROM node:8.9.4-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install react-scripts@0.9.5 -g
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . .
CMD ["npm", "start"]