const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus
} = require('../controllers/taskController');
const { validateObjectId } = require('../middleware/errorMiddleware');

// Routes mounted at /api/tasks
router.route('/')
  .get(getAllTasks)
  .post(createTask);

router.route('/:id')
  .get(validateObjectId, getTaskById)
  .put(validateObjectId, updateTask)
  .delete(validateObjectId, deleteTask);

router.route('/:id/status')
  .patch(validateObjectId, updateTaskStatus);

module.exports = router;
