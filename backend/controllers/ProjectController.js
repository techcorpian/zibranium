import Project from '../models/ProjectModel.js';
import dotenv from 'dotenv';
dotenv.config();

// Insert Projects
export const insertProject = (req, res) => {
  const { name, location_id } = req.body;

  // Store project details in MySQL database
  const newProject = new Project({ name, location_id });
  Project.insertProject(newProject, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Failed to upload project' });
      return;
    } 
    res.send(data);
  });
 
};

// Get all project datas
export const getProjects = async (req,res) => {
  try {
    const results = await Project.getProjects();
    res.json(results);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
 
};

// Get all locations
export const getLocations = async (req,res) => {
  try {
    const results = await Project.getLocations();
    res.json(results);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  }
 
};

