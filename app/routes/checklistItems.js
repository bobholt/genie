'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	checklistItems = require('../../app/controllers/checklistItems');

module.exports = function(app) {
	// ChecklistItem Routes
	app.get('/checklistItems', users.requiresLogin, checklistItems.list);
	app.post('/checklistItems', users.requiresLogin, checklistItems.hasAuthorization, checklistItems.create);
	app.get('/checklistItems/:checklistItemId', users.requiresLogin, checklistItems.read);
	app.put('/checklistItems/:checklistItemId', users.requiresLogin, checklistItems.hasAuthorization, checklistItems.update);
	app.del('/checklistItems/:checklistItemId', users.requiresLogin, checklistItems.hasAuthorization, checklistItems.delete);

	// Finish by binding the checklistItem middleware
	app.param('checklistItemId', checklistItems.checklistItemByID);
};