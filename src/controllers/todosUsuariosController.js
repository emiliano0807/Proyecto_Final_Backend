const { poolPromise } = require('../db/db');
module.exports = {
getAll: async (req, res) => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
        SELECT *
        FROM usuariosTodasColonias
        ORDER BY CAST(SUBSTRING(id_Usuarios, 3, LEN(id_Usuarios)) AS INT)
      `);
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener los usuarios de todas las colonias');
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', id)
        .query(`
              SELECT 
              nombre + ' ' + Apellido_1 + ' ' + Apellido_2 AS NombreCompleto
              FROM usuariosTodasColonias
              WHERE id_Usuarios = @id
        `);
      if (result.recordset.length === 0) return res.status(404).send('Usuario no encontrado');
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener el usuario');
    }
  }
}