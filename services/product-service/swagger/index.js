const app = require('connect')();
const http = require('http');
const swagger_tools = require('swagger-tools');
const js_yaml = require('js-yaml');
const fs = require('fs');

const server_port = 3001;

const spec = fs.readFileSync('./swagger.yml', 'utf8');
const swagger_doc = js_yaml.safeLoad(spec);

swagger_tools.initializeMiddleware(swagger_doc, middleware => {
    app.use(middleware.swaggerMetadata());
    app.use(middleware.swaggerValidator());
    app.use(middleware.swaggerRouter({}));
    app.use(middleware.swaggerUi());
    http.createServer(app)
        .listen(server_port);
});
