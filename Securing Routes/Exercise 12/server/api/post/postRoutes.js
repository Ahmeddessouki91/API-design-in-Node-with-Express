const router = require('express').Router();
const logger = require('../../util/logger');
const controller = require('./postController');
const auth = require('../../auth/auth');

// lock down the right routes :)
router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post([
        auth.decodeToken(),
        auth.getFreshUser()
    ], controller.post);

router.route('/:id')
    .get(controller.getOne)
    .put(auth.decodeToken(), auth.getFreshUser(), controller.put)
    .delete(auth.decodeToken(), auth.getFreshUser(), controller.delete);

module.exports = router;
