'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	HistoricalEvent = mongoose.model('HistoricalEvent'),
	_ = require('lodash');

/**
 * Create a historicalEvent
 */
exports.create = function(req, res) {
	var historicalEvent = new HistoricalEvent(req.body);

	historicalEvent.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				historicalEvent: historicalEvent
			});
		} else {
			res.jsonp(historicalEvent);
		}
	});
};

/**
 * Show the current historicalEvent
 */
exports.read = function(req, res) {
	res.jsonp(req.historicalEvent);
};

/**
 * Update a historicalEvent
 */
exports.update = function(req, res) {
	var historicalEvent = req.historicalEvent;

	historicalEvent = _.extend(historicalEvent, req.body);

	historicalEvent.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(historicalEvent);
		}
	});
};

/**
 * Delete an historicalEvent
 */
exports.delete = function(req, res) {
	var historicalEvent = req.historicalEvent;

	historicalEvent.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(historicalEvent);
		}
	});
};

/**
 * List of HistoricalEvents
 */
exports.list = function(req, res) {
	HistoricalEvent.find().sort('startDate').populate('place', 'displayName').populate('media').exec(function(err, historicalEvents) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(historicalEvents);
		}
	});
};

/**
 * HistoricalEvent middleware
 */
exports.historicalEventByID = function(req, res, next, id) {
	HistoricalEvent.findById(id).populate('place', 'displayName').populate('media').exec(function(err, historicalEvent) {
		if (err) return next(err);
		if (!historicalEvent) return next(new Error('Failed to load historicalEvent ' + id));
		req.historicalEvent = historicalEvent;
		next();
	});
};

/**
 * HistoricalEvent authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.send(403, 'User is not authorized');
  }
  next();
};