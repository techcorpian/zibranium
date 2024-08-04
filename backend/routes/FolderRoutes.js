import express from 'express';
const router = express.Router();

import { insertFolder, getProjectDatas, getFolders } from '../controllers/FolderController.js';

router.post('/upload',insertFolder);

router.get('/projects/:id', getProjectDatas);

router.get('/:id', getFolders);



export default router