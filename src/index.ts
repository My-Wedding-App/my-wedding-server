import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import router from './routes';

dotenv.config({
  path: path.join(__dirname, '..', '/.env')
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
const app: Express = express();

app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});