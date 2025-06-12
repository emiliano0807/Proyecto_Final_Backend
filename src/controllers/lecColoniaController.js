//Lecturas La Colonia Controller
const {poolPromise} = require('../db/db');
module.exports = {
    getAll: async (req, res) =>{
        try {
            const pool = await poolPromise;
            const result = await pool.request().query(`
                SELECT *
                FROM LecturasLaColonia
                ORDER BY CAST(SUBSTRING(NumeroMedidor, 3, LEN(NumeroMedidor)) AS INT)
                `);
                res.json(result.recordset);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener las lecturas');
            
        }
    },

    createLectura: async (req, res) =>{
        console.log("Body Recibido", req.body); // Agregado para depuración
        const {NumeroMedidor, Fecha, LecturaAnterior, LecturaActual, Consumo, Monto, FaltaAsamblea, MultaRtraso} = req.body;
        try {
            const pool = await poolPromise;
            await pool.request()
                .input('NumeroMedidor', NumeroMedidor)
                .input('Fecha', Fecha)
                .input('LecturaAnterior', LecturaAnterior)
                .input('LecturaActual', LecturaActual)
                .input('Consumo', Consumo)
                .input('Monto', Monto)
                .input('FaltaAsamblea', FaltaAsamblea)
                .input('MultaRetraso', MultaRtraso)
                .query(`
                    INSERT INTO LecturasLaColonia (NumeroMedidor, Fecha, LecturaAnterior, LecturaActual, Consumo, Monto, FaltaAsamblea, MultaRetraso)
                    VALUES (@NumeroMedidor, @Fecha, @LecturaAnterior, @LecturaActual, @Consumo, @Monto, @FaltaAsamblea, @MultaRetraso)
                `);
                res.status(201).json('Lectura creada');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al crear la lectura');
        }
    }
}