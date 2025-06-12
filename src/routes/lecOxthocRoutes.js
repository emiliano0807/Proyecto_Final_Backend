const express = require('express');
const router = express.Router();
const controller = require('../controllers/lecOxthocController');

router.get('/', controller.getAll);
router.post('/', controller.createLectura);

module.exports = router;
