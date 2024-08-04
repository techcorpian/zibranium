import { pool } from '../config/db.config.js';

class Folder {
    constructor(folder) {
        this.name = folder.name;
        this.project_id = folder.project_id;
    } 

    static insertFolder(newFolder, result){
        // Store file details in MySQL database
        pool.query('INSERT INTO folders SET ?', newFolder, (err, res) => {
            if (err) {
            console.error('Error inserting folder into database:', err);
            result(err, null);
            return;
            }
            result(null, { id: res.insertId, ...newFolder });

        });
    }

    // Get all folders
    static getFolders(id){  
        return new Promise((resolve, reject) => {
          const sql = `SELECT *,DATE_FORMAT(created_at, '%d.%m.%Y') AS created_date FROM folders WHERE project_id = ?`;
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

    // Get all project datas
    static getProjectDatas(id){  
        return new Promise((resolve, reject) => {
          const sql = `SELECT * FROM projects WHERE id = ?`;
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

export default Folder;

