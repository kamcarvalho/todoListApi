'use strict'
const TodoListController = require('./todoList/todoList.controller');

module.exports = function(app) {
  const todoListController = new TodoListController();

  app.route('/tasks')
    .get((req, res) => todoListController.listAllTasks(req, res))
    .post((req, res) => todoListController.createTask(req, res));

  app.route('/task/:taskId')
    .get((req, res) => todoListController.readTask(req, res))
    .put((req, res) => todoListController.updateTask(req, res))
    .delete((req, res) => todoListController.deleteTask(req, res));
};
