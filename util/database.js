const mysql= require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node1',
    password: 'amit'
});

module.exports = pool.promise();