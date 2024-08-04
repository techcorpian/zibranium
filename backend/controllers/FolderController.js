import Folder from '../models/FolderModel.js';
import dotenv from 'dotenv';
dotenv.config();

// Insert Folders
export const insertFolder = (req, res) => {
  const { name, project_id } = req.body;

  // Validate input
  if (!name) {
    return res.status(400).send({ message: 'Folder name is required' });
  }else if(!project_id){
    return res.status(400).send({ message: 'Some Internal Params error' });
  }

  // Store folder details in MySQL database
  const newFolder = new Folder({ name, project_id });
  Folder.insertFolder(newFolder, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Failed to upload folder' });
      return;
    } 
    res.send(data);
  });
 
};

// Get all project datas
export const getProjectDatas = async (req,res) => {
  try {
    const id = req.params.id;
    const results = await Folder.getProjectDatas(id);
    res.json(results);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
 
};

// Get all folders
export const getFolders = async (req,res) => {
  try {
    const id = req.params.id;
    const results = await Folder.getFolders(id);
    res.json(results);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
 
};

