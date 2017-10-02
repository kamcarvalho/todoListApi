'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');
const moment = require('moment');

var titleValidator = [
  validate({
    validator: 'isLength',
    arguments: [3,10],
    message: 'Title should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var descriptionValidator =[
  validate({
    validator: 'isLength',
    arguments: [1,20],
    message: 'Description should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

const createDateValidator = [
  validate({
    validator: (date) => moment(date).isSameOrBefore(moment()),
    message: 'Create Date cannot be greater than current date'
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
    required: 'Task date is required',
    validate: createDateValidator
  },
  status: {
    type: String,
    enum: ['pending', 'ongoing', 'completed'],
    required: 'Task status is required'
  },
  description: {
    type: String,
    required: 'Description task is required',
    validate: descriptionValidator
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);
