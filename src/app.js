const express = require('express');
const taskRoutes = require('./routes/users.routes');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config()

const app = express()
const PORT = 3000

app.use('/tasks', taskRoutes)

app.listen(PORT, ()=>{
    console.log(`Servidor activo en http://localhost:${PORT}`);
})