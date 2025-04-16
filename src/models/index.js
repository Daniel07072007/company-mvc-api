const path = require('path');
const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');
const { readdirSync } = require('fs');

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const sequelize = new Sequelize({
    host: dbHost,
    username: dbUser,
    password: dbPassword,
    dialect: "mysql",
    port: dbPort,
    database: dbName,
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;


const files = readdirSync(__dirname)
    .filter((file) => file.endsWith(".js") && file !== 'index.js');

files.forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;