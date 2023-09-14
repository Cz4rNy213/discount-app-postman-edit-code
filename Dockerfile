# Use the official Node.js 14.x image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your application will run
EXPOSE 8080

# Specify the command to run your application
CMD [ "npm", "start" ]
