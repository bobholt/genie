'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	repositories = require('../../app/controllers/repositories');

module.exports = function(app) {
	// Article Routes
	app.get('/repositories', users.requiresLogin, repositories.list);
	app.post('/repositories', users.requiresLogin, repositories.create);
	app.get('/repositories/:repositoryId', users.requiresLogin, repositories.read);
	app.put('/repositories/:repositoryId', users.requiresLogin, repositories.hasAuthorization, repositories.update);
	app.del('/repositories/:repositoryId', users.requiresLogin, repositories.hasAuthorization, repositories.delete);

	// Finish by binding the repository middleware
	app.param('repositoryId', repositories.repositoryByID);
};