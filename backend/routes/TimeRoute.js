// Time Routes
import express from 'express';
const router = express.Router();

import { insertTime, getTime } from '../controllers/TimeController.js';

// Routes Are Defined Here
router.post('/your_insert_route', insertTime);
router.get('/your_get_route', getTime);

export default router;