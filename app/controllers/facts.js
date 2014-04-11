'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Fact = mongoose.model('Fact'),
	_ = require('lodash');

/**
 * Create a fact
 */
exports.create = function(req, res) {
	var fact = new Fact(req.body);
  fact.user = req.user;

	fact.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				fact: fact
			});
		} else {
			res.jsonp(fact);
		}
	});
};

/**
 * Show the current fact
 */
exports.read = function(req, res) {
	res.jsonp(req.fact);
};

/**
 * Update a fact
 */
exports.update = function(req, res) {
	var fact = req.fact;

	fact = _.extend(fact, req.body);

	fact.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(fact);
		}
	});
};

/**
 * Delete an fact
 */
exports.delete = function(req, res) {
	var fact = req.fact;

	fact.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(fact);
		}
	});
};

/**
 * List of Facts
 */
exports.list = function(req, res) {
	Fact.find().sort('startDate').populate('user', 'displayName').populate('place', 'displayName').populate('sources', 'citation').populate('media').exec(function(err, facts) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(facts);
		}
	});
};

/**
 * Fact middleware
 */
exports.factByID = function(req, res, next, id) {
	Fact.findById(id).populate('user', 'displayName').populate('place', 'displayName').populate('sources', 'citation').populate('media').exec(function(err, fact) {
		if (err) return next(err);
		if (!fact) return next(new Error('Failed to load fact ' + id));
		req.fact = fact;
		next();
	});
};

/**
 * Fact authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.fact.user.id !== req.user.id) {
    return res.send(403, 'User is not authorized');
  }
  next();
};