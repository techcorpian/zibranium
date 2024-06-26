import mysql from 'mysql';
import * as dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
  user: process.env.Z_USERNAME,
  password: process.env.Z_PASSWORD,
  host: process.env.Z_HOST,
  database: process.env.Z_DATABASE,
  connectionLimit: 10,  // Adjust the limit as per your requirement
});

pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error connecting to the database:', error);
      return;
    }
    console.log('Successfully connected to the database with pool.');
    connection.release();  // Release the connection back to the pool
  });

export default pool;