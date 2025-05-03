const { poolPromise } = require('../db/db');

module.exports = {
  getAll: async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
        SELECT *
        FROM usuariosLaColonia
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
        .query('SELECT * FROM usuariosLaColonia WHERE id_Usuarios = @id');
      if (result.recordset.length === 0) return res.status(404).send('Usuario no encontrado');
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener el usuario');
    }
  },

  create: async (req, res) => {
    const { id_Usuarios, nombre, Apellido_1, Apellido_2 } = req.body;
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('id_Usuarios', id_Usuarios)
        .input('nombre', nombre)
        .input('Apellido_1', Apellido_1)
        .input('Apellido_2', Apellido_2)
        .query(`
          INSERT INTO usuariosLaColonia (id_Usuarios, nombre, Apellido_1, Apellido_2)
          VALUES (@id_Usuarios, @nombre, @Apellido_1, @Apellido_2)
        `);
      res.status(201).send('Usuario creado');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al crear el usuario');
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { nombre, Apellido_1, Apellido_2 } = req.body;
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', id)
        .input('nombre', nombre)
        .input('Apellido_1', Apellido_1)
        .input('Apellido_2', Apellido_2)
        .query(`
          UPDATE usuariosLaColonia
          SET nombre = @nombre, Apellido_1 = @Apellido_1, Apellido_2 = @Apellido_2
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
        .query('DELETE FROM usuariosLaColonia WHERE id_Usuarios = @id');
      if (result.rowsAffected[0] === 0) return res.status(404).send('Usuario no encontrado');
      res.send('Usuario eliminado');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al eliminar el usuario');
    }
  }
};
