'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	people = require('../../app/controllers/people');

module.exports = function(app) {
	// Person Routes
	app.get('/people', users.requiresLogin, people.list);
	app.post('/people', users.requiresLogin, people.create);
	app.get('/people/:personId', users.requiresLogin, people.read);
	app.put('/people/:personId', users.requiresLogin, people.hasAuthorization, people.update);
	app.del('/people/:personId', users.requiresLogin, people.hasAuthorization, people.delete);

	// Finish by binding the person middleware
	app.param('personId', people.personByID);
};