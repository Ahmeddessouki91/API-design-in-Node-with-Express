const router = require('express').Router();
const logger = require('../../util/logger');
const controller = require('./userController');
const auth = require('../../auth/auth');

// lock down the right routes :)
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);
router.get('/me', checkUser, controller.me);

router.route('/')
    .get(controller.get)
    .post(controller.post);

router.route('/:id')
    .get(controller.getOne)
    .put(checkUser, controller.put)         // add new middleware BEFORE checkUser to prevent other user from modifying
    .delete(checkUser, controller.delete);  // add new middleware BEFORE checkUser to prevent other user from deleting

// N.B. New middleware above would check id received on req against id in database
//

module.exports = router;
