'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Media = mongoose.model('Media'),
	_ = require('lodash');

/**
 * Create media
 */
exports.create = function(req, res) {
	var media = new Media(req.body);
  media.user = req.user;

	media.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				media: media
			});
		} else {
			res.jsonp(media);
		}
	});
};

/**
 * Show the current media
 */
exports.read = function(req, res) {
	res.jsonp(req.media);
};

/**
 * Update media
 */
exports.update = function(req, res) {
	var media = req.media;

	media = _.extend(media, req.body);

	media.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(media);
		}
	});
};

/**
 * Delete media
 */
exports.delete = function(req, res) {
	var media = req.media;

	media.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(media);
		}
	});
};

/**
 * List of Media
 */
exports.list = function(req, res) {
	Media.find().sort('caption').populate('user', 'displayName').exec(function(err, media) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(media);
		}
	});
};

/**
 * Media middleware
 */
exports.mediaByID = function(req, res, next, id) {
	Media.findById(id).populate('user', 'displayName').exec(function(err, media) {
		if (err) return next(err);
		if (!media) return next(new Error('Failed to load media ' + id));
		req.media = media;
		next();
	});
};

/**
 * Media authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.media.user.id !== req.user.id) {
    return res.send(403, 'User is not authorized');
  }
  next();
};