const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: process.env.DB_PASSWORD,
        database: 'thecompany_db'
    },
    console.log(`Connected to thecompany_db database.`)
);

module.exports = db;
