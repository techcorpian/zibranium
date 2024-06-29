import express from 'express';
const router = express.Router();

import { getConnect, CreateFile, getPages, getFiles } from './zController.js';

router.get('/',getConnect);

router.get('/pages',getPages);

router.get('/files/:id',getFiles);

router.post('/create',CreateFile);

export default router