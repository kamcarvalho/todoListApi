'use strict';

const mongoose = require('mongoose');
const Task = mongoose.model('Tasks');

exports.listAllTasks = function(req, res) {
  Task.find({}, function(err, task) {
    if(err) {
      res.status(400);
      res.send(err);
    } else {
      res.json(task);
    }
  });
};

exports.createAtask = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.status(201);
      res.json(task);
    }
  });
};

exports.readAtask = function(req, res){
  Task.findById(req.params.taskId, function(err, task) {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.json(task);
    }
  });
};

exports.updateAtask = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task){
    if (err) {
      res.status(400);
      res.send(err);
    } else{
      res.json(task);
    }
  });
};

exports.deleteAtask = function(req, res) {

  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err) {
      res.status(400);
      res.send(err);
    }
    res.json({ message: 'Task successfully deleted' });
  });
};
