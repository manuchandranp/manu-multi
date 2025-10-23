# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY lib/package.json ./
COPY lib/package-lock.json ./

# Install app dependencies
RUN npm install

# Copy the action's source code to the container
COPY lib/index.js ./

# Specify the command to run the action
ENTRYPOINT ["node", "index.js"]
