const express = require('express');
const todoItemRouter = express.Router();
const todoItemController = require('../controllers/todoItemController');

// Create
todoItemRouter.post('/', todoItemController.createTodoItem);

// Read
todoItemRouter.get('/', todoItemController.getAllTodoItems);

// Update
todoItemRouter.put('/:id', todoItemController.updateTodoItem);

// Delete
todoItemRouter.delete('/:id', todoItemController.deleteTodoItem);


module.exports = todoItemRouter;
