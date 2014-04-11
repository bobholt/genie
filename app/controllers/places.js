'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Place = mongoose.model('Place'),
	_ = require('lodash');

/**
 * Create a place
 */
exports.create = function(req, res) {
	var place = new Place(req.body);
	place.user = req.user;

	place.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				place: place
			});
		} else {
			res.jsonp(place);
		}
	});
};

/**
 * Show the current place
 */
exports.read = function(req, res) {
	res.jsonp(req.place);
};

/**
 * Update a place
 */
exports.update = function(req, res) {
	var place = req.place;

	place = _.extend(place, req.body);

	place.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(place);
		}
	});
};

/**
 * Delete an place
 */
exports.delete = function(req, res) {
	var place = req.place;

	place.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(place);
		}
	});
};

/**
 * List of Places
 */
exports.list = function(req, res) {
	Place.find().sort('displayPlace').populate('user', 'displayName').populate('media').exec(function(err, places) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(places);
		}
	});
};

/**
 * Place middleware
 */
exports.placeByID = function(req, res, next, id) {
	Place.findById(id).populate('user', 'displayName').populate('media').exec(function(err, place) {
		if (err) return next(err);
		if (!place) return next(new Error('Failed to load place ' + id));
		req.place = place;
		next();
	});
};

/**
 * Place authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.place.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};