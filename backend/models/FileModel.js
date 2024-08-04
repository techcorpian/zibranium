import { pool } from '../config/db.config.js';
import { body, validationResult } from 'express-validator';

class File {
    constructor(file) {
        this.filename = file.filename;
        this.filepath = file.path;
        this.folder_id = file.folder_id
    } 

    static insertFile(newFile, result){
        // Store file details in MySQL database
        pool.query('INSERT INTO files SET ?', newFile, (err, res) => {
            if (err) {
            console.error('Error inserting file into database:', err);
            result(err, null);
            return;
            }
            result(null, { id: res.insertId, ...newFile });

        });
    }

    static getFile(id){
  
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM files WHERE folder_id = ?';
          pool.query(sql, [id], (err, results) => {
            if (err) {
              console.error('Error executing query:', err);
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
    }

}

export default File;