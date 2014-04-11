'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Source = mongoose.model('Source'),
	_ = require('lodash');

/**
 * Create a source
 */
exports.create = function(req, res) {
	var source = new Source(req.body);
	source.user = req.user;

	source.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				source: source
			});
		} else {
			res.jsonp(source);
		}
	});
};

/**
 * Show the current source
 */
exports.read = function(req, res) {
	res.jsonp(req.source);
};

/**
 * Update a source
 */
exports.update = function(req, res) {
	var source = req.source;

	source = _.extend(source, req.body);

	source.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(source);
		}
	});
};

/**
 * Delete an source
 */
exports.delete = function(req, res) {
	var source = req.source;

	source.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(source);
		}
	});
};

/**
 * List of Sources
 */
exports.list = function(req, res) {
	Source.find().sort('title').populate('user', 'displayName').populate('sourceType').populate('repository').populate('media').exec(function(err, sources) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(sources);
		}
	});
};

/**
 * Source middleware
 */
exports.sourceByID = function(req, res, next, id) {
	Source.findById(id).populate('user', 'displayName').populate('sourceType').populate('repository').populate('media').exec(function(err, source) {
		if (err) return next(err);
		if (!source) return next(new Error('Failed to load source ' + id));
		req.source = source;
		next();
	});
};

/**
 * Source authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.source.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};