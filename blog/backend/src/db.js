import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: process.env.SQL_HOST || 'localhost',
    user: process.env.SQL_USER || 'root',
    password: process.env.SQL_PASS || '',
    database: process.env.SQL_DB || 'my_db',
});