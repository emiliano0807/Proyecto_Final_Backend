const express = require('express');
const router = express.Router();
const lecturasController = require('../controllers/lecturasTotalesController');

// Obtener la última lectura actual por medidor
router.get('/ultimaLectura/:medidor', lecturasController.obtenerUltimaLectura);

module.exports = router;




