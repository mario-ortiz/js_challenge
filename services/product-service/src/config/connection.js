const config = require('./config');
const Sequelize = require('sequelize');

const reconnectOptions = {
    max_retries: 999,
    onRetry: function(count) {
        console.log('connection lost, trying to reconnect (' + count + ')');
    }
};

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: 'db',
    port: 5432,
    dialect: 'postgres',
    reconnect: reconnectOptions || true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
});

module.exports = sequelize;