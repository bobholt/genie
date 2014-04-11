'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LogItem Schema
var LogItemSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  source: {
    type: Schema.ObjectId,
    ref: 'Source'
  },
  objective: {
    type: String,
    default: '',
    trim: true
  },
  results: {
    type: String,
    default: '',
    trim: true
  },
  periodSearched: {
    type: String,
    default: '',
    trim: true
  },
  peopleSearched: [{
    type: Schema.ObjectId,
    ref: 'Person'
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

mongoose.model('LogItem', LogItemSchema);