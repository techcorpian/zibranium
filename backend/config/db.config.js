import mysql from 'mysql'
import * as dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createConnection({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
  });

pool.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

export default pool;