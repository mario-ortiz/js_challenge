const moment = require('moment');
const Sequelize = require('sequelize');
const connection = require('./../config/connection');
const jwt = require('./../helpers/jwt');
const encrypt = require('./../helpers/encrypt');

const User = connection.define('user',
    {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: Sequelize.STRING(40),
        last_name: Sequelize.STRING(40),
        email: {
            type: Sequelize.STRING(128),
            validate: {
                isEmail: {
                    msg: 'Wrong email format'
                }
            }
        },
        password: Sequelize.STRING(40),
        username: Sequelize.STRING(40),
        createdat: Sequelize.DATE,
        updatedat: Sequelize.DATE
    },
    {
        createdAt: 'createdat',
        updatedAt: 'updatedat'
    },
    {
        hooks: {
            beforeCreate(instance) {
                instance.createdat = moment();
                instance.updatedat = moment();
            },

            beforeUpdate(instance) {
                instance.updatedat = moment();
            }
        },
    }
);

User.login = (email, password) => {
    return User
        .findOne({
            where: {
                email
            }
        })
        .then(user => {
            if (!user) throw 'User not found';
            return [
                encrypt
                    .compare(password, user.password),
                user
            ];
        })
        .spread((is_valid, user) => {
            if (!is_valid) throw 'User and/or password are incorrect';
            return jwt
                .issue({
                    user_id: user.user_id
                });
        });
};

User.register = (user_data) => {
    const { first_name, last_name, email, password, username } = user_data;
    return User
        .findOne({
            where: {
                email
            }
        })
        .then(user => {
            if (user) throw 'User already registered';
            return encrypt
                .encrypt(password);
        })
        .then(encrypted_password => {
            return User
                .create({
                    first_name,
                    last_name,
                    email,
                    password: encrypted_password,
                    username
                });
        })
        .then(new_user => {
            return jwt
                .issue({
                    user_id: new_user.user_id
                });
        });
};

module.exports = User;
