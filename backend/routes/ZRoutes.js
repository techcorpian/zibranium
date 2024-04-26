import express from 'express';
const router = express.Router();

import { getConnect } from '../controllers/ZController.js';

router.get('/',getConnect);

export default router