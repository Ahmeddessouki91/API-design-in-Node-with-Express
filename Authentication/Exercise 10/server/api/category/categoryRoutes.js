const router = require('express').Router();
const controller = require('./categoryController');
const logger = require('../../util/logger');

// setup boilerplate route just to satisfy a request
// for building
router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post(controller.post);

router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete);

module.exports = router;
