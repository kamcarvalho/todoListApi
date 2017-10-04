'use strict'
const todoList = require('../controllers/todoListController');

module.exports = function(app) {
  //todoList Routes
  app.route('/tasks')
    .get(todoList.listAllTasks)
    .post(todoList.createAtask);

  app.route('/task/:taskId')
    .get(todoList.readAtask)
    .put(todoList.updateAtask)
    .delete(todoList.deleteAtask);
};
