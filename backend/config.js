import mysql from 'mysql'
import * as dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
  });