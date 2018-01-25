const config = require('./config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: '127.0.0.1',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
});

sequelize.sync();

module.exports = sequelize;