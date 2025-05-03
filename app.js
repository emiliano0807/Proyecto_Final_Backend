const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const cerritoRoutes = require('./src/routes/cerritoRoutes');
const vegaRoutes = require('./src/routes/vegaRoutes');
const encinosRoutes = require('./src/routes/encinosRoutes');
const oxthocRoutes = require('./src/routes/oxthocRoutes');
const coloniaRoutes = require('./src/routes/coloniaRoutes');
const todosUsuariosRoutes = require('./src/routes/todosUsuariosRoutes');

dotenv.config();
app.use(express.json());
app.use(cors());
// Rutas
app.use('/usuariosElCerrito', cerritoRoutes);
app.use('/usuariosLaVega', vegaRoutes);
app.use('/usuariosLosEncinos', encinosRoutes);
app.use('/usuariosOxthoc', oxthocRoutes);
app.use('/usuariosLaColonia', coloniaRoutes);
app.use('/usuariosTotal', todosUsuariosRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
