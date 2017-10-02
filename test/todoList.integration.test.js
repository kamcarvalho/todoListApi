var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:3000');

describe('Integration todoList endpoint tests', function() {
  it('Request todoList should return 200', function(done) {
    api.get('/tasks').expect(200, done);
  })

  it('Create a task should return 201', function(done) {
    api.post('/tasks')
    .send({
      title: 'Buy orange',
      create_date: Date.now,
      status:'pending',
      description: 'buy tomorrow'
    })
    .expect(201, done);
  })

  it('Try to create an invalid user should return 400', function(done) {
    api.post('/tasks')
    .send({
      title: 'Buy orange juice+*&'
    })
    .expect(400, done);
  })
});
