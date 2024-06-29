import express from 'express';
import cors from 'cors';
import * as dotenv from "dotenv";
import bodyParser from 'body-parser';
dotenv.config();
import zRoutes from './z-main/zRoutes.js';

//importing routes
import TimeRoutes from './routes/TimeRoute.js';


//middleware
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/zibranium', zRoutes);

//main routes
app.use('/time', TimeRoutes);


app.listen(process.env.PORT, () => {
   console.log('Zibranium (backend) is running in',process.env.PORT);
});