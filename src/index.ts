import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import router from './routes';

const cert = fs.readFileSync('/app/certificate.crt');
const key = fs.readFileSync('/app/private.key');

const config = {
  key,
  cert
};

dotenv.config({
  path: path.join(__dirname, '..', '/.env')
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 80;
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

app.get('/.well-known/pki-validation/E19CCB7D5885560ECE8114005E3278C2.txt', (req, res) => {
  res.sendFile(('/app/E19CCB7D5885560ECE8114005E3278C2.txt'));
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const httpsServer = https.createServer(config, app);
httpsServer.listen(8443);
