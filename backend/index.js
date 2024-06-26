import express from 'express';
import cors from 'cors';
import * as dotenv from "dotenv";
import bodyParser from 'body-parser';
dotenv.config();

//importing routes
import zRoutes from './z-main/zRoutes.js';

//middleware
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//main routes
app.use('/zibranium', zRoutes);

app.listen(process.env.PORT, () => {
   console.log('Zibranium (backend) is running in',process.env.PORT);
});