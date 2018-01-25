const bcrypt = require('bcrypt');
const q = require('q');

module.exports = {
    encrypt(plain_text) {
        const promise = q.defer();
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(plain_text, salt, function(err, hash) {
                if (err) return promise.reject(err);
                return promise.resolve(hash);
            });
        });

        return promise.promise;
    },

    compare(plain_text, encrypted_text) {
        const promise = q.defer();

        bcrypt.compare(plain_text, encrypted_text, function(err, res){
            if (err) return promise.reject();
            return promise.resolve(res);
        });

        return promise.promise;
    }
};