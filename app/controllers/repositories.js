'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Repository = mongoose.model('Repository'),
	_ = require('lodash');

/**
 * Create a repository
 */
exports.create = function(req, res) {
	var repository = new Repository(req.body);
	repository.user = req.user;

	repository.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				repository: repository
			});
		} else {
			res.jsonp(repository);
		}
	});
};

/**
 * Show the current repository
 */
exports.read = function(req, res) {
	res.jsonp(req.repository);
};

/**
 * Update a repository
 */
exports.update = function(req, res) {
	var repository = req.repository;

	repository = _.extend(repository, req.body);

	repository.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(repository);
		}
	});
};

/**
 * Delete an repository
 */
exports.delete = function(req, res) {
	var repository = req.repository;

	repository.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(repository);
		}
	});
};

/**
 * List of Repositories
 */
exports.list = function(req, res) {
	Repository.find().sort('name').populate('user', 'displayName').exec(function(err, repositories) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(repositories);
		}
	});
};

/**
 * Repository middleware
 */
exports.repositoryByID = function(req, res, next, id) {
	Repository.findById(id).populate('user', 'displayName').exec(function(err, repository) {
		if (err) return next(err);
		if (!repository) return next(new Error('Failed to load repository ' + id));
		req.repository = repository;
		next();
	});
};

/**
 * Repository authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.repository.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};