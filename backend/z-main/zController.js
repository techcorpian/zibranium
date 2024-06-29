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

// Get all Pages
export const getPages = async (req, res) => {
  try {
    const sql = 'SELECT * FROM pages WHERE deletestatus = "0"';
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

// Get all Files
export const getFiles = async (req, res) => {
  try {
    const sql = 'SELECT * FROM files WHERE deletestatus = "0"';
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

  // Database operation to insert into pages
  const sql = `INSERT INTO pages (name, url) VALUES (?, ?)`;
  const values = [name, name];
  let insertId;

  try {
    const results = await new Promise((resolve, reject) => {
      pool.query(sql, values, (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    insertId = results.insertId;
    console.log('Query executed successfully. Insert ID:', insertId);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error saving new pages');
    return;
  }

  const fileExt = ['Controller.js', 'Model.js', 'Route.js'];

  // Insert into files table
  for (const ext of fileExt) {
    const fileSql = `INSERT INTO files (filename, page_id, location) VALUES (?, ?, ?)`;
    const fileValues = [`${name}${ext}`, insertId, 'backend'];

    try {
      await new Promise((resolve, reject) => {
        pool.query(fileSql, fileValues, (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      console.log(`File ${name}${ext} inserted into database.`);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error saving new files');
      return;
    }
  }

  // Path to your file
  const filePath = join(__dirname, '../index.js');

  // Define the markers and corresponding texts
  const markers = ['//importing routes', '//main routes'];
  const textsToInsert = [`import ${name}Routes from './routes/${name}Route.js';\n`, `app.use('/${name.toLowerCase()}', ${name}Routes);\n`];

  console.log(`Resolved file path: ${filePath}`);

  // Read the file
  try {
    let data = await fs.promises.readFile(filePath, 'utf8');
    console.log('File content read successfully.');

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
    await fs.promises.writeFile(filePath, data, 'utf8');
    console.log('Text inserted successfully for all markers.');
  } catch (err) {
    console.error('Error processing file:', err);
    res.status(500).send('Error processing file');
    return;
  }

  // Define the folder and file paths
  const mainFolder = join(__dirname, '../../frontend/src/view', `${name}`);
  const pageFolder = join(mainFolder, 'pages');
  const compFolder = join(mainFolder, 'components');
  const pagePath = join(pageFolder, `${name}.jsx`);
  const compPath = join(compFolder, `${name}Component.jsx`);

  // Create folders and files
  try {
    await fs.promises.mkdir(mainFolder, { recursive: true });
    console.log(`Main folder created at: ${mainFolder}`);

    const pageContent = `import React from 'react';
import ${name}Component from '../components/${name}Component';

const ${name} = () => {
  return (
    <div className='fixed flex flex-col justify-start align-start w-[100%]'>
      <div className='text-white text-xl bg-sky-800 py-3 text-2xl uppercase text-center'>${name}</div>
      <div className='p-6'>Zibranium Framework Creates The Components Are Created Here</div>
      <div className='text-black text-center text-xl py-6 border border-gray-300 rounded-xl shadow-lg mx-6'><${name}Component /></div>
    </div>
  );
};

export default ${name};`;

    await fs.promises.mkdir(pageFolder, { recursive: true });
    console.log(`Page folder created at: ${pageFolder}`);

    await fs.promises.writeFile(pagePath, pageContent, 'utf8');
    console.log(`File created at: ${pagePath}`);

    await fs.promises.mkdir(compFolder, { recursive: true });
    console.log(`Component folder created at: ${compFolder}`);

    const compContent = `import React from 'react';

const ${name}Component = () => {
  return (
    <div>${name}Component</div>
  );
};

export default ${name}Component;`;

    await fs.promises.writeFile(compPath, compContent, 'utf8');
    console.log(`File created at: ${compPath}`);
  } catch (err) {
    console.error('Error creating folder or file:', err);
    res.status(500).send('Error creating folder or file');
    return;
  }

  const FrontExt = ['.jsx', 'Component.jsx'];

  // Insert frontend files into the database
  for (const ext of FrontExt) {
    const fileSql = `INSERT INTO files (filename, page_id, location) VALUES (?, ?, ?)`;
    const fileValues = [`${name}${ext}`, insertId, 'frontend'];

    try {
      await new Promise((resolve, reject) => {
        pool.query(fileSql, fileValues, (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      console.log(`File ${name}${ext} inserted into database.`);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error saving new files');
      return;
    }
  }

  // Path to your frontend app file
  const appPath = join(__dirname, '../../frontend/src/App.jsx');

  // Define the markers and corresponding texts
  const fmarkers = ['// My Imports - Your Imports are added here', '{/* My Routes - Your Routes are added here*/}'];
  const ftextsToInsert = [`import ${name} from './view/${name}/pages/${name}';\n`, `<Route path='/${name}' element={<${name} />} />\n`];

  console.log(`Resolved file path: ${appPath}`);

  // Read the file
  try {
    let data = await fs.promises.readFile(appPath, 'utf8');
    console.log('File content read successfully.');

    fmarkers.forEach((marker, index) => {
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
      data = data.slice(0, endOfLineIndex) + ftextsToInsert[index] + data.slice(endOfLineIndex);
    });

    // Write the modified content back to the file once after all insertions
    await fs.promises.writeFile(appPath, data, 'utf8');
    console.log('Text inserted successfully for all markers.');
  } catch (err) {
    console.error('Error processing file:', err);
    res.status(500).send('Error processing file');
    return;
  }
};
