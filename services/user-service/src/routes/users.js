const express = require('express');
const User = require('./../models/users');
const auth = require('./../helpers/auth');

const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .send({
                status: 'error',
                payload: {
                    message: 'Missing required information'
                }
            });
    }
    return User
        .login(email, password)
        .then(token => {
            return res
                .send({
                    status: 'ok',
                    payload: {
                        token
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

router.post('/register', (req, res) => {
    const { first_name, last_name, email, password, username } = req.body;
    if (!first_name || !last_name || !email || !password || !username) {
        return res
            .send({
                status: 'error',
                payload: 'Missing required information'
            });
    }

    return User
        .register(req.body)
        .then(token => {
            return res
                .send({
                    status: 'ok',
                    payload: {
                        token
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

router.get('/auth', auth.is_authenticated, (req, res) => {
    return res
        .send({
            status: 'ok',
            payload: {
                user: req.user
            }
        });
});

module.exports = router;
