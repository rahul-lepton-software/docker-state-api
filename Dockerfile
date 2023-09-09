# Use the official Node.js image with version 16
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the .env file into the container (if it exists)
COPY .env ./

# Copy the rest of your application code
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose the port your application listens on (if needed)
EXPOSE 8000

# Define the command to start your application
CMD ["npm", "start"]