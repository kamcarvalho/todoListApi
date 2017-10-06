const mongoose = require('mongoose');
const Task = mongoose.model('Tasks');

class TodoListController {
  listAllTasks(req, res) {
    Task.find({}, (err, task) => {
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        res.json(task);
      }
    });
  }

  createTask(req, res) {
    const newTask = new Task(req.body);
    newTask.save((err, task) => {
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        res.status(201);
        res.json(task);
      }
    });
  }

  readTask(req, res) {
    Task.findById(req.params.taskId, (err, task) => {
      if (err) {
        res.status(404);
        res.send(err);
      } else {
        res.json(task);
      }
    });
  }

  updateTask(req, res) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, (err, task) => {
      if (err) {
        res.status(404);
        res.send(err);
      } else{
        res.json(task);
      }
    });
  }

  deleteTask(req, res) {
    Task.remove({_id: req.params.taskId}, (err, task) => {
      if (err) {
        res.status(404);
        res.send(err);
      } else {
        res.json({ message: 'Task successfully deleted' });
      }
    });
  }
}

module.exports = TodoListController;
