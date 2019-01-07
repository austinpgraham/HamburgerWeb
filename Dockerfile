# base image
FROM node:9.6.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
COPY public/index.html /usr/src/app/public/index.html
RUN mkdir /usr/src/app/src
COPY ./src /usr/src/app/src/
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
RUN npm run build
RUN yarn global add serve
ENV PORT 80
EXPOSE 80
# start app
CMD ["serve", "-d", "build", "-p", "80"]
