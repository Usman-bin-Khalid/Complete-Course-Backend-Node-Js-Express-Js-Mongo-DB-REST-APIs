
const TodoItem = require('../models/TodoItem');

exports.createTodoItem = async (req, res, next) => {
  try {
        console.log("Incoming Data:", req.body);
    const { task, date , completed } = req.body;
    const todoItem = new TodoItem({ task, date , completed});
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

// ✅ Update Todo by ID
exports.updateTodoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { task, date , completed} = req.body;
    

    // Validate incoming data
    if (!task && !date) {
      return res.status(400).json({ message: "Provide 'task' or 'date' to update." });
    }

    const updatedTodo = await TodoItem.findByIdAndUpdate(
      id,
      { task, date , completed},
      { new: true } // return updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo item not found' });
    }

    res.status(200).json({
      message: 'Todo item updated successfully',
      updatedTodo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update todo item' });
  }
};
