'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	sourceTypes = require('../../app/controllers/sourceTypes');

module.exports = function(app) {
	// SourceType Routes
	app.get('/sourceTypes', users.requiresLogin, sourceTypes.list);
	app.post('/sourceTypes', users.requiresLogin, sourceTypes.create);
	app.get('/sourceTypes/:sourceTypeId', users.requiresLogin, sourceTypes.read);
	app.put('/sourceTypes/:sourceTypeId', users.requiresLogin, sourceTypes.hasAuthorization, sourceTypes.update);
	app.del('/sourceTypes/:sourceTypeId', users.requiresLogin, sourceTypes.hasAuthorization, sourceTypes.delete);

	// Finish by binding the sourceType middleware
	app.param('sourceTypeId', sourceTypes.sourceTypeByID);
};