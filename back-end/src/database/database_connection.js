const mysql = require("mysql2/promise");
require('dotenv').config();

const pool = mysql.createPool({
    host: "localhost",      // Sesuaikan dengan database kamu
    user: "root",           // Sesuaikan dengan username MySQL
    password: "",           // Sesuaikan dengan password MySQL
    database: "nama_database", // Sesuaikan dengan database yang benar
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


module.exports = pool;