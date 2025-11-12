const express = require('express');
const todoItemRouter = express.Router();
const todoItemController = require('../controllers/todoItemController');

// POST new Todo
todoItemRouter.post('/', todoItemController.createTodoItem);

// Optional: GET all todos for visibility
todoItemRouter.get('/', todoItemController.getAllTodoItems);

module.exports = todoItemRouter;
