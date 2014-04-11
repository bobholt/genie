'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	LogItem = mongoose.model('LogItem'),
	_ = require('lodash');

/**
 * Create a logItem
 */
exports.create = function(req, res) {
	var logItem = new LogItem(req.body);
  logItem.user = req.user;

	logItem.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				logItem: logItem
			});
		} else {
			res.jsonp(logItem);
		}
	});
};

/**
 * Show the current logItem
 */
exports.read = function(req, res) {
	res.jsonp(req.logItem);
};

/**
 * Update a logItem
 */
exports.update = function(req, res) {
	var logItem = req.logItem;

	logItem = _.extend(logItem, req.body);

	logItem.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(logItem);
		}
	});
};

/**
 * Delete an logItem
 */
exports.delete = function(req, res) {
	var logItem = req.logItem;

	logItem.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(logItem);
		}
	});
};

/**
 * List of LogItems
 */
exports.list = function(req, res) {
	LogItem.find().sort('title').populate('user', 'displayName').populate('source').populate('peopleSearched').exec(function(err, logItems) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(logItems);
		}
	});
};

/**
 * LogItem middleware
 */
exports.logItemByID = function(req, res, next, id) {
	LogItem.findById(id).populate('user', 'displayName').populate('source').populate('peopleSearched').exec(function(err, logItem) {
		if (err) return next(err);
		if (!logItem) return next(new Error('Failed to load logItem ' + id));
		req.logItem = logItem;
		next();
	});
};

/**
 * LogItem authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.logItem.user.id !== req.user.id) {
    return res.send(403, 'User is not authorized');
  }
  next();
};