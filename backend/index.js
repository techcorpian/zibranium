import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from "dotenv";
dotenv.config();

//importing routes
import FileRoutes from './routes/FileRoutes.js';
import ProjectRoutes from './routes/ProjectRoutes.js';
import FolderRoutes from './routes/FolderRoutes.js';
import AuthRoutes from './routes/auth/AuthRoutes.js'

//middleware
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/store', FileRoutes);
app.use('/projects', ProjectRoutes);
app.use('/folders', FolderRoutes);
app.use('/api/auth', AuthRoutes);

app.listen(process.env.PORT, () => {
   console.log('Zibranium (backend) is running in',process.env.PORT);
});
