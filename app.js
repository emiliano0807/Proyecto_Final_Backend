const express = require('express');
const sql = require('mssql');
const dotenv = require('dotenv')
const app = express();
dotenv.config();
const port = 3000;
app.use(express.json());



// Configuración de SQL Server
const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER, // o tu dirección
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: process.env.SQL_ENCRYPT === 'true', // cambia según configuración
        trustServerCertificate: process.env.SQL_TRUST === 'true' // cambia según configuración
    }
};

//Verificar conexion a la base de datos
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
    sql.connect(config, err => {
        if (err) {
            console.error('Error de conexión a SQL Server:', err);
        } else {
            console.log('Conectado a SQL Server');
        }
    });
});


// GET - Leer todos los usuarios
app.get('/usuariosCerrito', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query(`
            SELECT *
            FROM usuariosElCerrito
            ORDER BY CAST(SUBSTRING(id_Usuarios, 3, LEN(id_Usuarios)) AS INT)
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('GET ALL ERROR:', err);
        res.status(500).send('Error al obtener los usuarios');
    }
});

  // GET - Leer un usuario por ID
app.get('/usuariosCerrito/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM usuariosElCerrito WHERE id_Usuarios = ${id}`;
        if (result.recordset.length === 0) return res.status(404).send('Usuario no encontrado');
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('GET ONE ERROR:', err);
        res.status(500).send('Error al obtener el usuario');
    }
});

  // POST - Crear un nuevo usuario
app.post('/usuariosCerrito', async (req, res) => {
    const { id_Usuarios, nombre, correo } = req.body;
    try {
        await sql.connect(config);
        await sql.query`
            INSERT INTO usuariosElCerrito (id_Usuarios, nombre, correo)
            VALUES (${id_Usuarios}, ${nombre}, ${correo})
        `;
        res.status(201).send('Usuario creado');
    } catch (err) {
        console.error('POST ERROR:', err);
        res.status(500).send('Error al crear el usuario');
    }
});
  // PUT - Actualizar un usuario
app.put('/usuariosCerrito/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    try {
        await sql.connect(config);
        const result = await sql.query`
            UPDATE usuariosElCerrito
            SET nombre = ${nombre}, correo = ${correo}
            WHERE id_Usuarios = ${id}
        `;
        if (result.rowsAffected[0] === 0) return res.status(404).send('Usuario no encontrado');
        res.send('Usuario actualizado');
    } catch (err) {
        console.error('PUT ERROR:', err);
        res.status(500).send('Error al actualizar el usuario');
    }
});
  // DELETE - Eliminar un usuario
    app.delete('/usuariosCerrito/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.connect(config);
        const result = await sql.query`
            DELETE FROM usuariosElCerrito WHERE id_Usuarios = ${id}
        `;
        if (result.rowsAffected[0] === 0) return res.status(404).send('Usuario no encontrado');
        res.send('Usuario eliminado');
    } catch (err) {
        console.error('DELETE ERROR:', err);
        res.status(500).send('Error al eliminar el usuario');
    }
});

//Para usuarios de la vega

// GET - Leer todos los usuarios
app.get('/usuariosLaVega', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query(`
            SELECT *
            FROM usuariosLaVega
            ORDER BY CAST(SUBSTRING(id_Usuarios, 3, LEN(id_Usuarios)) AS INT)
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('GET ALL ERROR:', err);
        res.status(500).send('Error al obtener los usuarios');
    }
});

  // GET - Leer un usuario por ID
app.get('/usuariosLaVega/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM usuariosLaVega WHERE id_Usuarios = ${id}`;
        if (result.recordset.length === 0) return res.status(404).send('Usuario no encontrado');
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('GET ONE ERROR:', err);
        res.status(500).send('Error al obtener el usuario');
    }
});

  // POST - Crear un nuevo usuario
app.post('/usuariosLaVega', async (req, res) => {
    const { id_Usuarios, nombre, correo } = req.body;
    try {
        await sql.connect(config);
        await sql.query`
            INSERT INTO usuariosLaVega (id_Usuarios, nombre, correo)
            VALUES (${id_Usuarios}, ${nombre}, ${correo})
        `;
        res.status(201).send('Usuario creado');
    } catch (err) {
        console.error('POST ERROR:', err);
        res.status(500).send('Error al crear el usuario');
    }
});
  // PUT - Actualizar un usuario
app.put('/usuariosLaVega/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    try {
        await sql.connect(config);
        const result = await sql.query`
            UPDATE usuariosLaVega
            SET nombre = ${nombre}, correo = ${correo}
            WHERE id_Usuarios = ${id}
        `;
        if (result.rowsAffected[0] === 0) return res.status(404).send('Usuario no encontrado');
        res.send('Usuario actualizado');
    } catch (err) {
        console.error('PUT ERROR:', err);
        res.status(500).send('Error al actualizar el usuario');
    }
});
  // DELETE - Eliminar un usuario
    app.delete('/usuariosLaVega/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.connect(config);
        const result = await sql.query`
            DELETE FROM usuariosLaVega WHERE id_Usuarios = ${id}
        `;
        if (result.rowsAffected[0] === 0) return res.status(404).send('Usuario no encontrado');
        res.send('Usuario eliminado');
    } catch (err) {
        console.error('DELETE ERROR:', err);
        res.status(500).send('Error al eliminar el usuario');
    }
});