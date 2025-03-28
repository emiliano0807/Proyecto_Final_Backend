const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME
});

//Verificar conexion a la base de datos
pool.connect((err, client, release)=>{
    if(err){
        console.log("Error de conexion", err.stack);
    }else{
        console.log("Conexion exitosa a la base de datos");
        release()
    }
})

module.exports = pool;