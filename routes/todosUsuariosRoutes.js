const express = require('express');
const router = express.Router();
const controller = require('../controllers/todosUsuariosController');

router.get('/', controller.getAll);

module.exports = router;