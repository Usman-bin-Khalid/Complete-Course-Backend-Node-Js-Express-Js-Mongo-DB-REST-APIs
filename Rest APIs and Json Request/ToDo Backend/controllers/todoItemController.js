
const TodoItem = require('../models/TodoItem');

exports.createTodoItem = async (req, res, next) => {
  try {
        console.log("Incoming Data:", req.body);
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

// ✅ Delete Todo by ID
exports.deleteTodoItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedItem = await TodoItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Todo item not found' });
    }

    res.status(200).json({ message: 'Todo item deleted successfully', deletedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete todo item' });
  }
}