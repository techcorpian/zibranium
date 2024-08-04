import express from 'express';
const router = express.Router();

import { getProjects, insertProject, getLocations } from '../controllers/ProjectController.js';

router.post('/upload',insertProject);

router.get('/list', getProjects);

router.get('/locations', getLocations);

export default router