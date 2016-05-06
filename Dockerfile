# our base image
FROM alpine:latest

# Update

# Install base packages
RUN apk update 
RUN apk upgrade 
RUN apk add curl wget bash gcc make libc-dev python g++

RUN apk add --update nodejs

# Install app dependencies
COPY package.json package.json
RUN  npm install
RUN  npm install -g babel-cli

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
