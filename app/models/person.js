'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Person Schema
var PersonSchema = new Schema({
  givenName: {
    type: String,
    trim: true,
    default: ''
  },
  familyName: {
    name: {
      type: String,
      trim: true,
      default: ''
    },
    canonicalName: {
      type: String,
      trim: true
    }
  },
  displayName: {
    type: String,
    trim: true
  },
  lastFirst: {
    type: String,
    trim: true
  },
  facts: [{
    type: Schema.ObjectId,
    ref: 'Fact'
  }],
  checklistItems: [{
    type: Schema.ObjectId,
    ref: 'ChecklistItem'
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

mongoose.model('Person', PersonSchema);