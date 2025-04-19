const { poolPromise } = require('../db');

module.exports = {
    getAll: async (req, res) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(`
                SELECT *
                FROM usuariosElCerrito
                ORDER BY CAST(SUBSTRING(id_Usuarios, 3, LEN(id_Usuarios)) AS INT)
            `);
        res.json(result.recordset);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener los usuarios');
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
            try {
                const pool = await poolPromise;
                const result = await pool.request()
                .input('id', id)
                .query('SELECT * FROM usuariosElCerrito WHERE id_Usuarios = @id');
                if (result.recordset.length === 0) return res.status(404).send('Usuario no encontrado');
                res.json(result.recordset[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener el usuario');
    }
    },

  create: async (req, res) => {
    const { id_Usuarios, nombre, correo } = req.body;
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('id_Usuarios', id_Usuarios)
        .input('nombre', nombre)
        .input('correo', correo)
        .query(`
          INSERT INTO usuariosElCerrito (id_Usuarios, nombre, correo)
          VALUES (@id_Usuarios, @nombre, @correo)
        `);
      res.status(201).send('Usuario creado');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al crear el usuario');
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', id)
        .input('nombre', nombre)
        .input('correo', correo)
        .query(`
          UPDATE usuariosElCerrito
          SET nombre = @nombre, correo = @correo
          WHERE id_Usuarios = @id
        `);
      if (result.rowsAffected[0] === 0) return res.status(404).send('Usuario no encontrado');
      res.send('Usuario actualizado');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al actualizar el usuario');
    }
  },

  remove: async (req, res) => {
    const { id } = req.params;
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', id)
        .query('DELETE FROM usuariosElCerrito WHERE id_Usuarios = @id');
      if (result.rowsAffected[0] === 0) return res.status(404).send('Usuario no encontrado');
      res.send('Usuario eliminado');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al eliminar el usuario');
    }
  }
};
