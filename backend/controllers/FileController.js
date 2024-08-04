import File from '../models/FileModel.js';
import dotenv from 'dotenv';
dotenv.config();

// Insert Files
export const insertFile = (req, res) => {
  const { filename, path } = req.file;
  const { folder_id } = req.body;

  // Validate input
  if (!filename) {
    return res.status(400).send({ message: 'File name is required' });
  } else if (!folder_id) {
    return res.status(400).send({ message: 'Some Internal Params error' });
  }

  // Store file details in MySQL database
  const newFile = new File({ filename, path, folder_id });
  File.insertFile(newFile, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Failed to upload file' });
      return;
    }
    res.send(data);
  });

};

// Get all files
export const getFile = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await File.getFile(id);
    res.json(results);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }

};


export const downloadFile = (req, res) => {
  const { filename } = req.params;
  const file = `uploads/${filename}`;

  res.download(file); // Initiates the file download
}