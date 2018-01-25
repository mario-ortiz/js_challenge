const Piranhax = require('piranhax');
const config = require('./../config/config');
const _ = require('lodash');

module.exports = {
    get_product_information(asin) {
        const client = new Piranhax(config.amazon.access_key, config.amazon.secret_key, config.amazon.associate_id);
        return client
            .ItemLookup(asin, {
                ResponseGroup: ['Large']
            })
            .then(result => {
                if (_.isEmpty(result)) throw 'Product not found';
                return {
                    rank: result.get('Item.SalesRank'),
                    dimensions : result.get('Item.ItemAttributes.ItemDimensions'),
                    category: result.get('Item.ItemAttributes.ProductGroup')
                };
            })
            .catch(() => {
                return {};
            });
    }
};