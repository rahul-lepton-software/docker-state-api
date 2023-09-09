# Start Node Project

1.  Run Script npm start

# Folder Structure

    Src
        Cache
            index.js -> Main JS file responsible for caching operations.

        Config
            index.js ->  Primary configuration file for application settings and environment variables.

        Controller
            S3.controller.js  -> Controller handling operations related to Amazon S3 storage.
            state.controller.js ->  Controller managing application state-related operations.

        Routes
            index.js -> Central routing file defining HTTP endpoints and linking to controller methods.

        SqlLayer
            index.js -> SQL data layer, connecting to and interacting with the database.

    .env -> File for storing environment-specific configuration variables and secrets.

    Dockerfile ->  Creating a Docker image of the application.

    package.lock.json ->  Dependency lock file ensuring consistent package installations.

    package.json -> Metadata and dependency list for the Node.js application.

    Readme.md -> Readme file.

# DOCKER

1.  Create file Dockerfile -

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

2.  Build the docker image -  
     docker build --tag node-state-api-docker .
3.  Check the image using command -
    docker images

4.  Run the docker image -
    docker run -d -p 8000:8000 node-state-api-docker

5.  See running images - -
    docker ps & docker ps -a (show stop and running containers)

6.  Stop running containers -
    docker stop <container-name>

7.  delete the container -
    docker rm <container-name>

8.  Clean-up Space ( unused resources)
    docker container prune

9.  Postgress Image cretae
    docker pull postgres:12-alpine

10. Run Postgres Container on 5432 Port and map to 5435 port
    docker run --name postgres12 -e POSTGRES_PASSWORD=postgres -p 5435:5432 -d (pg-image-name)
11. Get Container Ip Adress for internal connection  
     docker inspect 6d4b692b13e3 | Select-String "IPAddress"  
     (Here 6d4b692b13e3 is container id )

# Task4

    # individuals living in states can be quite big and the API performance can degrade
      Optimise your db for this computation.

      1) Pagination Implemented
      2) Redis Caching Implement
      3) Indexing on state Id column in population Table Implementes


    Hosting -Deploying the Application Using AWS Cloud
     1) Create an AWS Account
     2) Launch an EC2 Instance
     3) Secure Your EC2 Instance by set up security groups and network access controls to control inbound and outbound traffic to your instance.
     4) Generate pem file.
     5) Convert your .pem file to .ppk file using PuttyGen.
     6) Connect to Your EC2 Instance with private key(.ppk) file and ip adress using putty
     7) Install all dependencies & libraries
     8) Run the application with pm2
     9) Configure the domain to ip
     10) Create an SSL/TLS Certificate for application
