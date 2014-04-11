'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	historicalEvents = require('../../app/controllers/historicalEvents');

module.exports = function(app) {
	// HistoricalEvent Routes
	app.get('/historicalEvents', users.requiresLogin, historicalEvents.list);
	app.post('/historicalEvents', users.requiresLogin, historicalEvents.hasAuthorization, historicalEvents.create);
	app.get('/historicalEvents/:historicalEventId', users.requiresLogin, historicalEvents.read);
	app.put('/historicalEvents/:historicalEventId', users.requiresLogin, historicalEvents.hasAuthorization, historicalEvents.update);
	app.del('/historicalEvents/:historicalEventId', users.requiresLogin, historicalEvents.hasAuthorization, historicalEvents.delete);

	// Finish by binding the historicalEvent middleware
	app.param('historicalEventId', historicalEvents.historicalEventByID);
};