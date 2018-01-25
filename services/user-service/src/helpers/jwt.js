const jw_token = require('jsonwebtoken');
const q = require('q');
const config = require('./../config/config');

module.exports = {
    issue(payload) {
        const promise = q.defer();
        jw_token.sign(
            {
                payload
            },
            config.jwt,
            {
                issuer: config.platform.name,
                expiresIn: '1d'
            },
            (err, token) => {
                if (err) return promise.reject(err);

                return promise.resolve(token);
            }
        );
        return promise.promise;
    },

    verify(token) {
        const promise = q.defer();
        jw_token.verify(
            token,
            config.jwt,
            {
                issuer: config.platform.name
            },
            function(err, decoded) {
                if (err) return promise.reject(err);

                return promise.resolve(decoded);
            }
        );

        return promise.promise;
    }
};
