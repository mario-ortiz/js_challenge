const User = require('./../models/users');
const jwt = require('./jwt');

module.exports = {
    is_authenticated(req, res, next) {
        console.log(req.headers);
        if (!(req.headers && req.headers.authorization)) {
            return res
                .send({
                    status: 'error',
                    payload: {
                        message: 'Action not Allowed'
                    },
                });
        }
        const header = req.headers.authorization.split(' ');
        const token = header[1];
        return jwt
            .verify(token)
            .then(result => {
                if (!result) throw 'Action not Allowed';
                return User
                    .findOne({
                        where: {
                            user_id: result.payload.user_id
                        }
                    });
            })
            .then(user => {
                if (!user) throw 'Action not Allowed';
                req.user = user.user_id;
                next();
            })
            .catch(err => {
                return res
                    .send({
                        status: 'error',
                        payload: {
                            message: err.toString()
                        },
                    });
            });
    }
}