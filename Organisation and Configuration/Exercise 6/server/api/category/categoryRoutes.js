const router = require('express').Router();
const logger = require('../../util/logger');

// setup boilerplate route jsut to satisfy a request
// for building
router.route('/')
  .get(function(req, res){
    logger.log('Hey from categories!!');
    res.send({ok: true});
  });

module.exports = router;
