'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ChecklistItem Schema
var ChecklistItemSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: ''
  },
  sourceType: {
    type: Schema.ObjectId,
    ref: 'SourceType'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

mongoose.model('ChecklistItem', ChecklistItemSchema);