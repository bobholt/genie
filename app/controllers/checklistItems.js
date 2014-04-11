'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	ChecklistItem = mongoose.model('ChecklistItem'),
	_ = require('lodash');

/**
 * Create a checklistItem
 */
exports.create = function(req, res) {
	var checklistItem = new ChecklistItem(req.body);

	checklistItem.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				checklistItem: checklistItem
			});
		} else {
			res.jsonp(checklistItem);
		}
	});
};

/**
 * Show the current checklistItem
 */
exports.read = function(req, res) {
	res.jsonp(req.checklistItem);
};

/**
 * Update a checklistItem
 */
exports.update = function(req, res) {
	var checklistItem = req.checklistItem;

	checklistItem = _.extend(checklistItem, req.body);

	checklistItem.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(checklistItem);
		}
	});
};

/**
 * Delete an checklistItem
 */
exports.delete = function(req, res) {
	var checklistItem = req.checklistItem;

	checklistItem.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(checklistItem);
		}
	});
};

/**
 * List of ChecklistItems
 */
exports.list = function(req, res) {
	ChecklistItem.find().sort('-created').populate('sourceType').exec(function(err, checklistItems) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(checklistItems);
		}
	});
};

/**
 * ChecklistItem middleware
 */
exports.checklistItemByID = function(req, res, next, id) {
	ChecklistItem.findById(id).populate('sourceType').exec(function(err, checklistItem) {
		if (err) return next(err);
		if (!checklistItem) return next(new Error('Failed to load checklistItem ' + id));
		req.checklistItem = checklistItem;
		next();
	});
};

/**
 * ChecklistItem authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.send(403, 'User is not authorized');
  }
  next();
};