'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Place Schema
var PlaceSchema = new Schema({
  city: {
    type: String,
    default: '',
    trim: true
  },
  county: {
    type: String,
    default: '',
    trim: true
  },
  state: {
    type: String,
    default: '',
    trim: true
  },
  country: {
    type: String,
    default: '',
    trim: true
  },
  displayPlace: {
    type: String,
    trim: true
  },
  media: [{
    type: Schema.ObjectId,
    ref: 'Media'
  }],
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Place', PlaceSchema);