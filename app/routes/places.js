'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	places = require('../../app/controllers/places');

module.exports = function(app) {
	// Place Routes
	app.get('/places', users.requiresLogin, places.list);
	app.post('/places', users.requiresLogin, places.create);
	app.get('/places/:placeId', users.requiresLogin, places.read);
	app.put('/places/:placeId', users.requiresLogin, places.hasAuthorization, places.update);
	app.del('/places/:placeId', users.requiresLogin, places.hasAuthorization, places.delete);

	// Finish by binding the place middleware
	app.param('placeId', places.placeByID);
};