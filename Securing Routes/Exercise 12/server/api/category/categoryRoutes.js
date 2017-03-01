const router = require('express').Router();
const logger = require('../../util/logger');
const controller = require('./categoryController');
const auth = require('../../auth/auth');

// lock down the right routes :)
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post(checkUser, controller.post);

router.route('/:id')
    .get(controller.getOne)
    .put(checkUser, controller.put)
    .delete(checkUser, controller.delete);

module.exports = router;
