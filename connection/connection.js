const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: process.env.DB_PASSWORD,
        database: 'thecompany_db'
    },
    console.log(`Connected to thecompany_db database.`)
);

module.exports = db;
