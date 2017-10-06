const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Task = require('./todoList/todoList.model');
const bodyParser = require('body-parser');
const routes = require('./routes.js');

//mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); //register the routes

app.listen(port);

console.log('todo list RESTful API server started on: ' + port)

module.exports = app;
