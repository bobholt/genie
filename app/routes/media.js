'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	media = require('../../app/controllers/media');

module.exports = function(app) {
	// Media Routes
	app.get('/media', users.requiresLogin, media.list);
	app.post('/media', users.requiresLogin, media.create);
	app.get('/media/:mediaId', users.requiresLogin, media.read);
	app.put('/media/:mediaId', users.requiresLogin, media.hasAuthorization, media.update);
	app.del('/media/:mediaId', users.requiresLogin, media.hasAuthorization, media.delete);

	// Finish by binding the media middleware
	app.param('mediaId', media.mediaByID);
};