# Base image used 
FROM node:alpine
WORKDIR /usr/app
COPY ./ /usr/app

# Installing project dependencies
RUN npm install

# Running default command 
CMD ["npm", "run", "dev"]
