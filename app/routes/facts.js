'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	facts = require('../../app/controllers/facts');

module.exports = function(app) {
	// Fact Routes
	app.get('/facts', users.requiresLogin, facts.list);
	app.post('/facts', users.requiresLogin, facts.create);
	app.get('/facts/:factId', users.requiresLogin, facts.read);
	app.put('/facts/:factId', users.requiresLogin, facts.hasAuthorization, facts.update);
	app.del('/facts/:factId', users.requiresLogin, facts.hasAuthorization, facts.delete);

	// Finish by binding the fact middleware
	app.param('factId', facts.factByID);
};