import express from 'express';
const router = express.Router();
import multer from 'multer';

import { insertFile, getFile, downloadFile } from '../controllers/FileController.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename for each uploaded file
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'),insertFile);
router.get('/files/:id',getFile);
router.get('/download/:filename', downloadFile);

export default router