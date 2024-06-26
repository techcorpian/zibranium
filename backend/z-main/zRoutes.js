import express from 'express';
const router = express.Router();

import { getConnect, CreateFile, getPages } from './zController.js';

router.get('/',getConnect);

router.get('/pages',getPages);

router.post('/create',CreateFile);

export default router