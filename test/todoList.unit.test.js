var expect = require('chai').expect;

var todoListModel = require('../api/models/todoListModel');

describe('Tests for todoList model', function() {
  it('should be invalid if name is empty', function(done) {
    var todoList = new todoListModel();

    todoList.validate(function(err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('Should be invalid if name is bigger than 10 characters', function(done) {
    var todoList = new todoListModel({name: 'Buy some ap'});

    todoList.validate(function(err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('Should be invalid if name is smaller than 3 characters', function(done) {
    var todoList = new todoListModel({name: 'ap'});

    todoList.validate(function(err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('Should be invalid if name has special characters', function(done) {
    var todoList = new todoListModel({name: 'Buy @ppl#'});

    todoList.validate(function(err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });
});
