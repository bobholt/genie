'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// SourceType Schema
var SourceTypeSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true
  },
  fields: [{
    name: {
      type: String,
      trim: true
    },
    order: {
      type: Number
    }
  }],
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

mongoose.model('SourceType', SourceTypeSchema);