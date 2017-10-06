const moment = require('moment');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;
const AssertionError = chai.AssertionError;
const assert = chai.assert;
const should = chai.should();

var todoListModel = require('./todoList.model');
describe('Unit tests for todoList model', function() {
  it('Create a task should not return errors', async function() {
    var todoList = new todoListModel({title: 'buy fruits', create_date: moment(), status:'ongoing', description: 'task description'});

    return todoList.validate();
  });

  it('should be invalid if title is empty', async function() {
    const todoList = new todoListModel({title: null, create_date: moment(), status:'ongoing', description: 'task description'});

    return todoList.validate().should.be.rejectedWith('Task title is required');
  });

  it('Should be invalid if title is bigger than 10 characters', function() {
    var todoList = new todoListModel({title: 'Buy some ap', create_date: moment(), status: 'pending', description: 'I have to fo at'});

    return todoList.validate().should.be.rejectedWith('Title should be between 3 and 10 characters');
  });

  it('Should be invalid if title is smaller than 3 characters', function() {
    const todoList = new todoListModel({title: 'ap', create_date: moment(), status: 'pending', description: 'I have to fo at'});

    return todoList.validate().should.be.rejectedWith('Title should be between 3 and 10 characters');
  });

  it('should be invalid if date is empty', function() {
    const todoList = new todoListModel({title: 'buy fruits', create_date: null, status: 'pending', description: 'I have to fo at'});

    return todoList.validate().should.be.rejectedWith('Task date is required');
  });

  it('should be invalid if status is empty', function() {
    const todoList = new todoListModel({title: 'buy fruits', create_date: moment(), status: null, description: 'I have to go at'});

    return todoList.validate().should.be.rejectedWith('Task status is required');
  });

  it('should be invalid if description is empty', function() {
    const todoList = new todoListModel({title: 'buy fruits', create_date: Date.now(), status: 'pending', description: null});

    return todoList.validate().should.be.rejectedWith('Task description is required')
  });

  it('should be invalid if description is bigger than 20 characters', function() {
    const todoList = new todoListModel({title: 'buy fruits', create_date: Date.now(), status: 'pending', description: 'I have to go at supermarket'});

    return todoList.validate().should.be.rejectedWith('Description should be between 1 and 20 characters');
  });

  it('should be invalid if status is unknown', function() {
    const todoList = new todoListModel({title: 'buy fruits', create_date: moment(), status: 'test', description: 'I have to go at'});

    return todoList.validate().should.be.rejectedWith('is not a valid enum value for path `status`');
  });

  it('should be invalid if date is greater than current date', () => {
    const tomorrow = moment().add(1, 'day');
    const todoList = new todoListModel({title: 'buy fruits', create_date: tomorrow, status: 'pending', description: 'I have to go'});

    return todoList.validate().should.be.rejectedWith('Create Date cannot be greater than current date');
  });
});
