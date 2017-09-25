var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:3000');

describe('Integration todoList endpoint tests', function() {
  it('Request todoList should return 200', function(done) {
    api.get('/tasks').expect(200, done);
  })

  it('Create an user should return 200', function(done) {
    api.post('/tasks')
    .send({
      name: 'Buy orange'
    })
    .expect(200, done);
  })

  it('Try to create an invalid user should return 200', function(done) {
    api.post('/tasks')
    .send({
      name: 'Buy orange juice+*&'
    })
    .expect(200, done);
  })
});
