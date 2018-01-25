const express = require('express');
const Product = require('./../models/products');
const amazon_helper = require('./../helpers/amazon');
const _ = require('lodash');
const auth = require('./../helpers/auth');

const router = express.Router();

router.get('/list', (req, res) => {
    return Product
        .list()
        .then(products => {
            return res
                .send({
                    status: 'ok',
                    payload: {
                        products
                    }
                });
        });
});

router.post('/search/:asin', (req, res) => {
    const asin = req.params.asin;
    if (!asin || asin.length !== 10) {
        return res
            .send({
                status: 'error',
                payload: {
                    message: 'Please provide a correct ASIN code.'
                }
            });
    }
    return amazon_helper
        .get_product_information(asin)
        .then(product_info => {
            if (_.isEmpty(product_info)) throw 'Product not found';
            return Product.add({
                asin,
                category: product_info.category,
                rank: product_info.rank,
                height: _.get(product_info, 'dimensions.Height._', 0),
                length: _.get(product_info, 'dimensions.Length._', 0),
                weight: _.get(product_info, 'dimensions.Weight._', 0),
                width: _.get(product_info, 'dimensions.Width._', 0)
            });
        })
        .then(() => {
            return Product
                .list();
        })
        .then(products => {
            return res
                .send({
                    status: 'ok',
                    payload: {
                        products
                    }
                });
        })
        .catch(err => {
            return res
                .send({
                    status: 'error',
                    payload: {
                        message: err.toString()
                    }
                });
        });
});

// This is just a test to validate users authorization for a specific endpoint
router.post('/protected', auth.is_authorized, (req, res) => {
    return res
        .send({
            status: 'ok',
            payload: {
                message: 'Authorized'
            }
        });
});

module.exports = router;
