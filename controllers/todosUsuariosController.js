const { poolPromise } = require('../db');
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
  }
}