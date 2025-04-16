const path = require('path');
const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');
const { readdirSync } = require('fs');

dotenv.config();

let sequelize;
const db = {}

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT

// Verificar variables de entorno
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Variable de entorno ${envVar} no está definida`);
    }
}

const init = async () => {
    if (!sequelize) {
        console.log('Intentando conectar a la base de datos con los siguientes parámetros:');
        console.log(`Host: ${dbHost}`);
        console.log(`Puerto: ${dbPort}`);
        console.log(`Base de datos: ${dbName}`);
        console.log(`Usuario: ${dbUser}`);
        
        sequelize = new Sequelize({
            host: dbHost,
            username: dbUser,
            password: dbPassword,
            dialect: "mysql",
            port: dbPort,
            database: dbName,
            logging: console.log, // Habilita el logging de queries SQL
            dialectOptions: {
                connectTimeout: 5000 // Timeout de 5 segundos
            }
        })
        
        try {
            await sequelize.authenticate();
            console.log('✅ Conexión a la base de datos establecida correctamente');
            console.log(`Versión del servidor MySQL: ${(await sequelize.query('SELECT VERSION()'))[0][0]['VERSION()']}`);
        } catch (error) {
            console.error('❌ Error al conectar a la base de datos:');
            console.error(`Mensaje de error: ${error.message}`);
            console.error(`Código de error: ${error.parent?.code || 'N/A'}`);
            console.error(`SQL Estado: ${error.parent?.sqlState || 'N/A'}`);
            throw error;
        }
    }

    const files = readdirSync(__dirname)
        .filter((file) => {
            return file.endsWith(".js") && file !== 'index.js';
        });
    files.forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    })
    return db;
}

module.exports = init;