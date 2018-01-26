## Features
- **Two microservices:** Users and Products microservices
- **Microservice authorization using JWT:** POST products/protected is a protected endpoint. Required Authorization: Bearer XXXX header
- **Tests:** Tests (npm run tests) for the products microservice
- **Docker integration:** Implement Docker to create containers and service discovery
- **Swagger:** Add swagger documentation

## Steps to test
- **Install Docker CE:** https://docs.docker.com/engine/installation/
- **Install Docker-Compose:** sudo apt install docker-compose (ubuntu)
- **Create containers:**
    export NODE_ENV=development
    docker-compose up --build -d user-service
    docker-compose up --build -d product-service
    docker-compose up --build -d web-service
    docker-compose up --build -d swagger
- **Run containers (each one in a different terminal):**
    export NODE_ENV=development
    docker-compose run user-service
    docker-compose run product-service
    docker-compose run web-service #localhost:3007
    docker-compose run swagger #localhost:3003/docs

## In Progress
- **Service Cloning:** Add cloning of services
- **Load balancing:** Add load balancing

These containers can be deployed with some extra configuration to Amazon ECS to create clusters.