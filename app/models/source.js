'use strict';

// Module dependencies.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Source Schema
var SourceSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true
  },
  citation: {
    type: String,
    default: '',
    trim: true
  },
  extract: {
    type: String,
    default: '',
    trim: true
  },
  url: {
    type: String,
    default: '',
    trim: true
  },
  sourceType: {
    type: Schema.ObjectId,
    ref: 'SourceType'
  },
  repository: {
    type: Schema.ObjectId,
    ref: 'Repository'
  },
  callNumber: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  condition: {
    type: String,
    default: '',
    trim: true
  },
  indexed: {
    type: Boolean
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

mongoose.model('Source', SourceSchema);