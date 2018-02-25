const moment = require('moment');
const Sequelize = require('sequelize');
const connection = require('./../config/connection');

const Product = connection.define('product',
    {
        product_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        asin: Sequelize.STRING(10),
        category: Sequelize.STRING(64),
        rank: Sequelize.INTEGER,
        height: Sequelize.INTEGER,
        width: Sequelize.INTEGER,
        length: Sequelize.INTEGER,
        weight: Sequelize.INTEGER,
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

Product.add = (product_data) => {
    const { asin, category, rank, height, length, width, weight } = product_data;
    return Product
        .findOne({
            where: {
                asin
            }
        })
        .then(product => {
            if (product) return;
            return Product
                .create({
                    asin,
                    category,
                    rank,
                    height,
                    length,
                    width,
                    weight
                });
        })
        .catch(() => {
            return null;
        });
};

Product.list = () => {
    return Product
        .findAll();
};

Product.find_one = (asin) => {
    return Product
        .findOne({
            where: {
                asin
            }
        })
        .then(product => {
            if (!product) throw 'Product not available';
            return product;
        });
};

Product
    .sync()
    .catch(err => {
        console.log('Problem syncing ', err);
    });

module.exports = Product;
