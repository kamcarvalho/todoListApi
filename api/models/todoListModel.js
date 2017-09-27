'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');

var titleValidator = [
  validate({
    validator: 'isLength',
    arguments: [3,10],
    message: 'Title should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var TaskSchema = new Schema({
  title: {
      type: String,
      required: 'Task title is required',
      validate: titleValidator
    },
  create_date: {
    type: Date,
    default: Date.now,
    required: 'Task date is required'
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default:['pending'],
    required: 'Task status is required'
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);
