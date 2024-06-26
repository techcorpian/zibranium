import { pool } from './z.config.js';
import { body, validationResult } from 'express-validator';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { dirname, join } from 'path';

// Get all Customers
export const getConnect = async (req, res) => {
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

// Get all Customers
export const getPages = async (req, res) => {
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CreateFile = async (req, res) => {
  const { name } = req.body;

  // Define file contents
  const controllerContent = `// ${name} Controller
import ${name} from '../models/${name}Model.js';
import dotenv from 'dotenv';
dotenv.config();

// Insert ${name}
export const insert${name} = (req, res) => {
  // Code Goes Here
};

// Get all ${name}
export const get${name} = async (req, res) => {
  // Code Goes Here
};`;

  const modelContent = `// ${name} Model
import { conn } from '../config/db.config.js';

class ${name} {
  constructor(${name.toLowerCase()}) {
    this.name = ${name.toLowerCase()}.name;
  }

  // Insert ${name}
  static insert${name}(arg1, arg2) {
    // Code Goes Here
  }

  // Get all ${name}
  static get${name}() {
    // Code Goes Here
  }
}

export default ${name};`;

  const routeContent = `// ${name} Routes
import express from 'express';
const router = express.Router();

import { insert${name}, get${name} } from '../controllers/${name}Controller.js';

// Routes Are Defined Here
router.post('/your_insert_route', insert${name});
router.get('/your_get_route', get${name});

export default router;`;

  const filesToCreate = [
    { path: join(__dirname, '../controllers', `${name}Controller.js`), content: controllerContent },
    { path: join(__dirname, '../models/', `${name}Model.js`), content: modelContent },
    { path: join(__dirname, '../routes/', `${name}Route.js`), content: routeContent },
  ];

  // Function to create files
  const createFile = ({ path, content }) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content, (err) => {
        if (err) {
          console.error(`Error creating file ${path}:`, err);
          reject('File creation failed');
        } else {
          console.log(`File created successfully: ${path}`);
          resolve();
        }
      });
    });
  };

  try {
    // Create all files
    await Promise.all(filesToCreate.map(createFile));
    res.status(200).send('Files created successfully');
  } catch (error) {
    res.status(500).send(error);
    return;
  }

  // Path to your file
  const filePath = path.join(__dirname, '../index.js');

  // Define the markers and corresponding texts
  const markers = ['//importing routes', '//main routes'];
  const textsToInsert = [`import ${name}Routes from './routes/${name}Route.js';\n`, `app.use('/${name.toLowerCase()}', ${name}Routes);\n`];

  console.log(`Resolved file path: ${filePath}`);

  // Read the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    console.log('File content read successfully.');

    // Loop through the markers and texts to insert
    markers.forEach((marker, index) => {
      const markerIndex = data.indexOf(marker);
      if (markerIndex === -1) {
        console.error(`Marker ${marker} not found in the file.`);
        return;
      }

      console.log(`Marker ${marker} found at position: ${markerIndex}`);

      // Find the end of the line containing the marker
      const endOfLineIndex = data.indexOf('\n', markerIndex) + 1;
      console.log(`End of line index for marker ${marker}: ${endOfLineIndex}`);

      // Insert the text after the marker
      data = data.slice(0, endOfLineIndex) + textsToInsert[index] + data.slice(endOfLineIndex);
    });

    // Write the modified content back to the file once after all insertions
    fs.writeFile(filePath, data, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to the file:', err);
        return;
      }

      console.log('Text inserted successfully for all markers.');
    });
  });
};

