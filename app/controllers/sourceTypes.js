'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	SourceType = mongoose.model('SourceType'),
	_ = require('lodash');

/**
 * Create a sourceType
 */
exports.create = function(req, res) {
	var sourceType = new SourceType(req.body);
	sourceType.user = req.user;

	sourceType.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				sourceType: sourceType
			});
		} else {
			res.jsonp(sourceType);
		}
	});
};

/**
 * Show the current sourceType
 */
exports.read = function(req, res) {
	res.jsonp(req.sourceType);
};

/**
 * Update a sourceType
 */
exports.update = function(req, res) {
	var sourceType = req.sourceType;

	sourceType = _.extend(sourceType, req.body);

	sourceType.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(sourceType);
		}
	});
};

/**
 * Delete an sourceType
 */
exports.delete = function(req, res) {
	var sourceType = req.sourceType;

	sourceType.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(sourceType);
		}
	});
};

/**
 * List of SourceTypes
 */
exports.list = function(req, res) {
	SourceType.find().sort('name').exec(function(err, sourceTypes) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(sourceTypes);
		}
	});
};

/**
 * SourceType middleware
 */
exports.sourceTypeByID = function(req, res, next, id) {
	SourceType.findById(id).exec(function(err, sourceType) {
		if (err) return next(err);
		if (!sourceType) return next(new Error('Failed to load sourceType ' + id));
		req.sourceType = sourceType;
		next();
	});
};

/**
 * SourceType authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.send(403, 'User is not authorized');
  }
  next();
};