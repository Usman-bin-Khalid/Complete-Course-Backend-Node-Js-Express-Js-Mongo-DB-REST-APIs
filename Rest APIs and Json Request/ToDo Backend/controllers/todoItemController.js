
const TodoItem = require('../models/TodoItem');

exports.createTodoItem = async (req, res, next) => {
  try {
    const { task, date } = req.body;
    const todoItem = new TodoItem({ task, date });
    await todoItem.save();
    res.status(201).json(todoItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create todo item' });
  }
};

// New: Get all Todo Items
exports.getAllTodoItems = async (req, res, next) => {
  try {
    const todos = await TodoItem.find();
    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
};
