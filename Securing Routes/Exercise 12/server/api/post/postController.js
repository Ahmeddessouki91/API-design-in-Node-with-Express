const Post = require('./postModel');
const _ = require('lodash');
const logger = require('../../util/logger');

exports.params = function(req, res, next, id) {
  Post.findById(id)
    .populate('author', 'username')   // don't update with password, only username
    .exec()
    .then(function(post) {
      if (!post) {
        next(new Error('No post with that id'));
      } else {
        req.post = post;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Post.find({})
    .populate('author categories')
    .exec()
    .then(function(posts){
      res.json(posts);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  const post = req.post;
  res.json(post);
};

exports.put = function(req, res, next) {
  let post = req.post;

  const update = req.body;

  _.merge(post, update);

  post.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  const newpost = req.body;
  Post.create(newpost)
    .then(function(post) {
      res.json(post);
    }, function(err) {
      logger.error(err);
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.post.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
