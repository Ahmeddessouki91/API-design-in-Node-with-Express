const lionRouter = require('express').Router();
const _ = require('lodash');

let lions = [];
let id = 0;

const updateId = function (req, res, next) {
    if (!req.body.id) {
        id++;
        req.body.id = id + '';
    }
    next();
};

lionRouter.param('id', function (req, res, next, id) {
    const lion = _.find(lions, {id: id});

    console.log(`lionRouter.param('id')`);

    if (lion) {
        req.lion = lion;
        next();
    } else {
        res.send();
    }
});

lionRouter.route('/')
    .get((req, res) => {
        res.json(lions);
    })
    .post(updateId, (req, res) => {
        const lion = req.body;

        lions.push(lion);
        res.json(lion);
    });

lionRouter.route('/:id')
    .get((req, res) => {
        console.log(`lionRouter.get('/:id')`);
        const lion = req.lion;
        res.json(lion || {});
    })
    .put((req, res) => {
        let update = req.body;

        if (update.id) {
            delete update.id
        }

        const lion = _.findIndex(lions, {id: req.params.id});

        if (!lions[lion]) {
            res.send();
        } else {
            const updatedLion = _.assign(lions[lion], update);
            res.json(updatedLion);
        }
    });

module.exports = lionRouter;
