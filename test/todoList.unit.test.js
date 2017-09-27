var expect = require('chai').expect;

var todoListModel = require('../api/models/todoListModel');

describe('Tests for todoList model', function() {
  it('Create a task should return 200', function(done) {
    var todoList = new todoListModel({title: 'Buyfruits', create_date: Date.now, status:'ongoing'});

    todoList.validate(function(err) {
      expect(err.errors.title).to.not.exist;
      expect(err.errors.title).to.not.exist;
      expect(err.errors.title).to.not.exist;
      done();
    })
  })

  it('should be invalid if title is empty', function(done) {
    var todoList = new todoListModel();

    todoList.validate(function(err) {
      expect(err.errors.title).to.exist;
      done();
    });
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
    var todoList = new todoListModel({title: 'buy fruits', create_date: Date.now, status: null});

    todoList.validate(function(err) {
      expect(err.errors.status).to.exist;
      done();
    });
  });
});
