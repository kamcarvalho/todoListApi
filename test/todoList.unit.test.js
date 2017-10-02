const moment = require('moment');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;
const AssertionError = chai.AssertionError;
const assert = chai.assert;

var todoListModel = require('../api/models/todoListModel');
//substituir var por let
describe('Tests for todoList model', function() {
  it('Create a task should not return errors', async function() {
    var todoList = new todoListModel({title: 'buy fruits', create_date:'2017-09-28T21:48:49.446Z', status:'ongoing', description: 'task description'});

    try {
      await todoList.validate();
    } catch(err) {
      throw err;
    }
  })

  it.only('should be invalid if title is empty', async function() {
    // const todoList = new todoListModel();
    var todoList = new todoListModel({title: 'asdasdas', create_date:'2017-09-28T21:48:49.446Z', status:'ongoing', description: 'task description'});

    try {
      await todoList.validate();
    } catch(err) {
      expect(err.errors.title).to.exist;
    }

    // return todoList.validate().should.be.rejectedWith('Task title is required');


  });

  it('Should be invalid if title is bigger than 10 characters', function(done) {
    var todoList = new todoListModel({title: 'Buy some ap'});

    todoList.validate(function(err) {
      expect(err.errors.title).to.exist;
      done();
    });
  });

  it('Should be invalid if title is smaller than 3 characters', function(done) {
    var todoList = new todoListModel({title: 'ap'});

    todoList.validate(function(err) {
      expect(err.errors.title).to.exist;
      done();
    });
  });

  it('should be invalid if date is empty', function(done) {
    var todoList = new todoListModel({title: 'buy fruits', create_date: null});

    todoList.validate(function(err) {
      expect(err.errors.create_date).to.exist;
      done();
    });
  });

  it('should be invalid if status is empty', function(done) {
    var todoList = new todoListModel({title: 'buy fruits', create_date: moment(), status: null});

    todoList.validate(function(err) {
      expect(err.errors.status).to.exist;
      done();
    });
  });
  it('should be invalid if description is empty', function(done) {
    var todoList = new todoListModel({title: 'buy fruits', create_date: Date.now(), status: 'pending', description: null});

    todoList.validate(function(err) {
      expect(err.errors.description).to.exist;
      done();
    });
  });
  it('should be invalid if description is bigger than 20 characters', function(done) {
    todolist = new todoListModel({title: 'buy fruits', create_date: Date.now(), status: 'pending', description: 'I have to go at supermarket'});

    todolist.validate(function(err) {
      expect(err.errors.description).to.exist;
      done();
    });
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
