import { pool } from '../config.js';
import { body, validationResult } from 'express-validator';

// Get all Customers
export const getConnect = async (req,res) => {
    try {
        const sql = 'SELECT * FROM connect';
        const results = await new Promise((resolve, reject) => {
          pool.query(sql, (err, results) => {
            if (err) {
              console.error('Error executing query:', err);
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
        res.json(results);
      } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      }
   
 };