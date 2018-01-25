const app = require('express')();
const body_parser = require('body-parser');
const query_parser = require('body-parser');
const product_routes = require('./routes/products');
const config = require('./config/config');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(body_parser.urlencoded({ extended: false}));
app.use(query_parser.urlencoded({ extended: false}));
app.use(body_parser.json());

app.use('/products', product_routes);

app.listen(config.node_env.PORT, () => {
    console.log(`listening to port ${config.node_env.PORT}`);
});
