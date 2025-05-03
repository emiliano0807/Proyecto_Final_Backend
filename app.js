const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const cerritoRoutes = require('./routes/cerritoRoutes');
const vegaRoutes = require('./routes/vegaRoutes');
const encinosRoutes = require('./routes/encinosRoutes');
const oxthocRoutes = require('./routes/oxthocRoutes');
const coloniaRoutes = require('./routes/coloniaRoutes');
const todosUsuariosRoutes = require('./routes/todosUsuariosRoutes');

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
