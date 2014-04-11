'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	logItems = require('../../app/controllers/logItems');

module.exports = function(app) {
	// LogItem Routes
	app.get('/logItems', users.requiresLogin, logItems.list);
	app.post('/logItems', users.requiresLogin, logItems.create);
	app.get('/logItems/:logItemId', users.requiresLogin, logItems.read);
	app.put('/logItems/:logItemId', users.requiresLogin, logItems.hasAuthorization, logItems.update);
	app.del('/logItems/:logItemId', users.requiresLogin, logItems.hasAuthorization, logItems.delete);

	// Finish by binding the logItem middleware
	app.param('logItemId', logItems.logItemByID);
};