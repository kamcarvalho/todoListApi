'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3,10],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only'
  })
];

var TaskSchema = new Schema({
  name: {
      type: String,
      required: 'Task name is required',
      validate: nameValidator
    },
  create_date: {
    type: Date,
    default: Date.now,
    required: 'Date is required'
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);
