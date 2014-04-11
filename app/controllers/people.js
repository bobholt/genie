'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Person = mongoose.model('Person'),
	_ = require('lodash');

/**
 * Create a person
 */
exports.create = function(req, res) {
	var person = new Person(req.body);
	person.user = req.user;

	person.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				person: person
			});
		} else {
			res.jsonp(person);
		}
	});
};

/**
 * Show the current person
 */
exports.read = function(req, res) {
	res.jsonp(req.person);
};

/**
 * Update a person
 */
exports.update = function(req, res) {
	var person = req.person;

	person = _.extend(person, req.body);

	person.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(person);
		}
	});
};

/**
 * Delete an person
 */
exports.delete = function(req, res) {
	var person = req.person;

	person.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(person);
		}
	});
};

/**
 * List of People
 */
exports.list = function(req, res) {
	Person.find().sort('lastFirst').populate('user', 'displayName').populate('facts').populate('checklistItems').populate('media').exec(function(err, people) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(people);
		}
	});
};

/**
 * Person middleware
 */
exports.personByID = function(req, res, next, id) {
	Person.findById(id).populate('user', 'displayName').populate('facts').populate('checklistItems').populate('media').exec(function(err, person) {
		if (err) return next(err);
		if (!person) return next(new Error('Failed to load person ' + id));
		req.person = person;
		next();
	});
};

/**
 * Person authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.person.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};