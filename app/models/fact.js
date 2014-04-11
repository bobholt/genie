'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Fact Schema
var FactSchema = new Schema({
  factType: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  place: {
    type: Schema.ObjectId,
    ref: 'Place'
  },
  sources: [{
    type: Schema.ObjectId,
    ref: 'Source'
  }],
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

mongoose.model('Fact', FactSchema);