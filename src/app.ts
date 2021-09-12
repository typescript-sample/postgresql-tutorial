import {json} from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import {Pool} from 'pg';
import {createContext} from './init';
import {route} from './route';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(json());

export const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  password: 'abcd1234',
  database: 'masterdata',
  port: 5432
});

const ctx = createContext(pool);
route(app, ctx);
http.createServer(app).listen(port, () => {
  console.log('Start server at port ' + port);
});
