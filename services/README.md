## Features
- **Two microservices:** Users and Products microservices
- **Microservice authorization using JWT:** POST products/protected is a protected endpoint. Required Authorization: Bearer XXXX header
- **Tests:** Tests for the products microservice (docker-compose run product-service npm tests)
- **Docker integration:** Implement Docker to create containers and service discovery
- **Swagger:** Add swagger documentation

## Steps to test
- **Install Docker CE:** https://docs.docker.com/engine/installation/
- **Install Docker-Compose:** sudo apt install docker-compose (ubuntu)
- **Create containers:**
    1. export NODE_ENV=development
    2. docker-compose up --build -d user-service
    3. docker-compose up --build -d product-service
    4. docker-compose up --build -d web-service
    5. docker-compose up --build -d swagger
- **Run containers (each one in a different terminal):**
    1. export NODE_ENV=development
    2. docker-compose run user-service
    3. docker-compose run product-service
    4. docker-compose run web-service (**http://localhost:3007**)
    5. docker-compose run swagger (**http://localhost:3003/docs**)

These containers can be deployed with some extra configuration to Amazon ECS to create clusters.

user-service is only there to demonstrate how both, the service discovery/communication and the authotization using JWT work.
1. Do a POST request to http://localhost:3000/users/register and send this information using x-www-form-urlencoded
 - first_name
 - last_name
 - email
 - username
 - password
you should receive a Token.
2. Do a POST request to http://localhost:3001/products/protected and send the Authorization header with value Bearer TOKEN (product-service will call user-service to authorize the request).
3. If the token is valid, you should receive an ok status, otherwise an error status.

## In Progress
- **Service Cloning:** Add cloning of services
- **Load balancing:** Add load balancing