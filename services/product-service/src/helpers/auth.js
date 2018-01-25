const request = require('request-promise');

module.exports = {
    is_authorized(req, res, next) {
        if (!(req.headers && req.headers.authorization)) {
            return res
                .send({
                    status: 'error',
                    payload: {
                        message: 'Action not Allowed'
                    }
                });
        }
        const options = {
            method: 'GET',
            uri: 'http://127.0.0.1:3000/users/auth',
            json: true,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
            },
        };
        return request(options)
            .then(response => {
                if (response.status === 'error') throw 'Action not allowed';
                req.user = response.user;
                return next();
            })
            .catch(() => {
                return res
                    .send({
                        status: 'error',
                        payload: {
                            message: 'Action not allowed'
                        }
                    });
            });
    }
};