const mongoose = require('mongoose');
const server = require('../server');
const Task = require('../api/models/todoListModel');
const moment = require('moment');
const axios = require('axios');
const chai = require("chai");
const expect = chai.expect;

axios.defaults.baseURL = 'http://localhost:3000';

describe('Integration tests for todoList API', function(done) {
  beforeEach(function(done) {
    Task.remove({}, function(err) {
      done();
    });
  });

  it('Request todoList should return 200' , function() {
    return axios.get('/tasks')
      .then((response) => {
        expect(response.status).to.equal(200);
      });
 });

  it('Create a task should return 201', function() {
     return axios.post('tasks', {
       title: "Buy Fruits",
       create_date: moment(),
       status: "ongoing",
       description: "I have to go at"
     })
      .then((response) => {
        expect(response.status).to.equal(201);
      });
  });

  it('Create a task without title should return an error', function() {

    return axios.post('/tasks', {
      title: null,
      create_date: moment(),
      status: "ongoing",
      description: "I have to go at"
    }).catch(error => expect(error.response.status).to.equal(400));
  });

  it('Get a task by id should return 200',  async function() {
    let task = new Task(
      {
        title: "Buy fruits",
        create_date: moment(),
        status: "ongoing",
        description: "I have to go at"
      });

    task = await task.save();

    return axios.get(`/task/${task.id}`)
        .then((response) => {
          expect(response.status).to.equal(200);
      });
  });

  it('Remove a task by id should return 200',  async function() {
    let task = new Task(
      {
        title: "Buy fruits",
        create_date: moment(),
        status: "ongoing",
        description: "I have to go at"
      });

    task = await task.save();

    return axios.delete(`/task/${task.id}`)
        .then((response) => {
          expect(response.status).to.equal(200);
    });
  });

  it('Remove an inexistent task by id should return 404',  async function() {
    let task = new Task(
      {
        title: "Buy fruits",
        create_date: moment(),
        status: "ongoing",
        description: "I have to go at"
      });

    task = await task.save();

    return axios.delete(`/task/${task.id}01`)
      .catch(error => expect(error.response.status).to.equal(404));
  });

  it('Update a task by id should return 200',  async function() {
    let task = new Task(
      {
        title: "Buy apple",
        create_date: moment(),
        status: "pending",
        description: "I have to go at"
      });

    task = await task.save();

    return axios.put(`/task/${task.id}`, {
      title: "Buy juice",
      create_date: moment(),
      status: "ongoing",
      description: "Book an appointment"
    })
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.data).to.have.property('title', 'Buy juice');
          expect(response.data).to.have.property('status', 'ongoing');
          expect(response.data).to.have.property('description', 'Book an appointment');
        });
  });

  it('Update an inexisting task by id should return 404',  async function() {
    let task = new Task(
      {
        title: "Buy apple",
        create_date: moment(),
        status: "pending",
        description: "I have to go at"
      });

    task = await task.save();

    return axios.put(`/task/${task.id}01`, {
      title: "Buy juice",
      create_date: moment(),
      status: "ongoing",
      description: "Book an appointment"
    }).catch(error => expect(error.response.status).to.equal(404));
  });
});
