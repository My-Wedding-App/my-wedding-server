import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import router from './routes';

dotenv.config({
  path: path.join(__dirname, '..', '/.env')
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
const app: Express = express();

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors({
  origin: allowedOrigins
}));

app.use(bodyParser.json());
app.use(router);

app.get('/', (req, res) => {
  res.send('Welcome to my wedding server');
});




app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});