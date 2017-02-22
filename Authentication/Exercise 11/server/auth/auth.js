const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const checkToken = expressJwt({secret: config.secrets.jwt});
const User = require('../api/user/userModel');

exports.decodeToken = function () {
    return function (req, res, next) {
        // make it optional to place token on query string
        // if it is, place it on the headers where it should be
        // so checkToken can see it. See follow the 'Bearer 034930493' format
        // so checkToken can see it and decode it
        if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }

        // this will call next if token is valid
        // and send error if its not. It will attached
        // the decoded token to req.user
        checkToken(req, res, next);
    };
};

exports.getFreshUser = function () {
    return function (req, res, next) {
        // we'll have access to req.user here
        // because we'll use decodeToken in before
        // this function in the middleware stack.
        // req.user will just be an object with the user
        // id on it. We want the full user object/
        // if no user is found it
        // was a valid JWT but didn't decode
        // to a real user in our DB. Either the user was deleted
        // since the client got the JWT, or
        // it was a JWT from some other source

        // update req.user with fresh user from the
        // stale token data
        User.findById(req.user._id)
            .then((user) => {
                if (!user) {
                    res.status(401).send('Unauthorized');
                } else {
                    req.user = user;
                    next();
                }
            }, (err) => {
                next(err);
            });
    };
};

exports.verifyUser = function () {
    return function (req, res, next) {
        const username = req.body.username;
        const password = req.body.password;

        // if no username or password then stop.
        if (!username || !password) {
            return res.status(400).send('You need a username and password');
        }

        // look user up in the DB so we can check
        // if the passwords match for the username

        // use the authenticate() method on a user doc. Passin
        // in the posted password, it will hash the
        // password the same way as the current passwords got hashed
        User.findOne({username: username})
            .then((user) => {   // on resolve - user is returned by the fulfilled promise
                if (!user) {
                    res.status(401).send('No user with the given username');
                } else {
                    if (!user.authenticate(password)) {
                        res.status(401).send('Wrong password');
                    } else {
                        // passwords matched, attach user to request object
                        // and continue
                        req.user = user;
                        next();
                    }
                }
            }, (err) => {       // on reject - report error
                next(err);
            });
    };
};

// util method to sign tokens on signup
exports.signToken = function (id) {
    return jwt.sign(
        {_id: id},
        config.secrets.jwt,
        // {expiresInMinutes: config.expireTime}
        {expiresIn: config.expireTime}
    );
};
