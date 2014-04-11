'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// HistoricalEvent Schema
var HistoricalEventSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: ''
  },
  eventType: {
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
  }
});

mongoose.model('HistoricalEvent', HistoricalEventSchema);