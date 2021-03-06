## Features
- **Two microservices:** Users and Products microservices
- **Microservice authorization using JWT:** POST products/protected is a protected endpoint. Required Authorization: Bearer XXXX header
- **Tests:** Tests for the products microservice (docker-compose run product-service npm tests)
- **Docker integration:** Implement Docker to create containers and service discovery
- **Swagger:** Add swagger documentation

## Steps to test
- **Install Docker CE:** https://docs.docker.com/engine/installation/
- **Install Docker-Compose:** sudo apt install docker-compose (ubuntu)
- **Create containers and Run containers :**
    1. export NODE_ENV=development
    2. docker-compose build
    3. docker-compose up -d (This will mount all containers)
    4. Access the web service: http://localhost:3007
    5. Access the Swagger API documentation example service: http://localhost:3003/docs (click on default to see the list)

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

- Working site: https://drive.google.com/open?id=12rDb4b1VVw49IY1FPkTUyzfJnlACKpJw

- Service communication: https://drive.google.com/open?id=1ZnNBnoKXTo8g4tt98Ql12DuD0ELAGPqo
 - Get a JWT on Login/register using the users-service
 - Call the /protected endpoint on the products service.
 - Products service will send a request to users-service to authorize the request.
