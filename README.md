# Start Node Project

1.  Run Script npm start

# Folder Structure

    Src
        Cache
            index.js
        Config
            index.js
        Controller
            S3.controller.js
            state.controller.js

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
    docker run --name postgres12 -e POSTGRES_PASSWORD=postgres -p 5435:5432 -d <pg-image-name>
11. Get Container Ip Adress for internal connection  
     docker inspect 6d4b692b13e3 | Select-String "IPAddress"  
     <Here 6d4b692b13e3 is container id >
