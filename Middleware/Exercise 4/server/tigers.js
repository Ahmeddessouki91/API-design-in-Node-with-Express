// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for lions
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server

const tigerRouter = require('express').Router();
const _ = require('lodash');

let tigers = [];
let id = 0;

const updateId = function (req, res, next) {
    if (!req.body.id) {
        id++;
        req.body.id = id + '';
    }
    next();
};

tigerRouter.param('id', function (req, res, next, id) {
    const tiger = _.find(tigers, {id: id});

    if (todo) {
        req.tiger = tiger;
        next();
    } else {
        res.send();
    }
});

tigerRouter.route('/')
    .get((req, res) => {
        res.json(tigers);
    })
    .post(updateId, (req, res) => {
        const tiger = req.body;

        tigers.push(tiger);
        res.json(tiger);
    });

tigerRouter.route('/:id')
    .get((req, res) => {
        const tiger = req.tiger;
        res.json(tiger || {});
    })
    .put((req, res) => {
        let update = req.body;

        if (update.id) {
            delete update.id
        }

        const tiger = _.findIndex(tigers, {id: req.params.id});

        if (!tigers[tiger]) {
            res.send();
        } else {
            const updatedtiger = _.assign(tigers[tiger], update);
            res.json(updatedtiger);
        }
    });

module.exports = tigerRouter;
