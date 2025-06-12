const { sql, poolPromise } = require('../db/db'); // Asegúrate que la ruta sea correcta

exports.obtenerUltimaLectura = async (req, res) => {
    const { medidor } = req.params;

    try {
        const pool = await poolPromise; // ✅ AQUÍ esperas la conexión

        const result = await pool
            .request()
            .input('medidor', sql.VarChar, medidor)
            .query(`
                SELECT TOP 1 LecturaActual
                FROM (
                    SELECT LecturaActual FROM lecturasLaVega WHERE NumeroMedidor = @medidor
                    UNION ALL
                    SELECT LecturaActual FROM lecturasElCerrito WHERE NumeroMedidor = @medidor
                    UNION ALL
                    SELECT LecturaActual FROM lecturasLosEncinos WHERE NumeroMedidor = @medidor
                    UNION ALL
                    SELECT LecturaActual FROM lecturasOxthoc WHERE NumeroMedidor = @medidor
                    UNION ALL
                    SELECT LecturaActual FROM lecturasLaColonia WHERE NumeroMedidor = @medidor
                ) AS Todas
                ORDER BY LecturaActual DESC
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'No se encontró ninguna lectura para este medidor.' });
        }

        res.json(result.recordset[0]); // { LecturaActual: valor }
    } catch (error) {
        console.error('Error al obtener última lectura:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};
