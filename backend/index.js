import express from 'express';
import cors from 'cors';
import * as dotenv from "dotenv";
dotenv.config();

//importing routes
import zRoutes from './routes/ZRoutes.js';

//middleware
const app = express();

app.use(express.json());
app.use(cors());

app.use('/zibranium', zRoutes);

app.listen(process.env.PORT, () => {
   console.log('Zibranium (backend) is running in',process.env.PORT);
});
