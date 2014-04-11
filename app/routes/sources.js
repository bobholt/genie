'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	sources = require('../../app/controllers/sources');

module.exports = function(app) {
	// Source Routes
	app.get('/sources', users.requiresLogin, sources.list);
	app.post('/sources', users.requiresLogin, sources.create);
	app.get('/sources/:sourceId', users.requiresLogin, sources.read);
	app.put('/sources/:sourceId', users.requiresLogin, sources.hasAuthorization, sources.update);
	app.del('/sources/:sourceId', users.requiresLogin, sources.hasAuthorization, sources.delete);

	// Finish by binding the source middleware
	app.param('sourceId', sources.sourceByID);
};