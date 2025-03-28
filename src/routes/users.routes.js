const express = require('express');
const router = express.Router();
const taskController = require('../controller/users.controller');

router.get("/", taskController.getTasks)
router.get("/:id", taskController.getTasksById)
router.post("/", taskController.createTask)
router.patch("/:id", taskController.updateTask)
router.delete("/:id", taskController.deleteTask)

module.exports = router
