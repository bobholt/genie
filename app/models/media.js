'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Media Schema
var MediaSchema = new Schema({
  file: {
    type: String,
    trim: true
  },
  caption: {
    type: String,
    trim: true
  },
  date: {
    type: Date
  },
  mediaCategory: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
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

mongoose.model('Media', MediaSchema);