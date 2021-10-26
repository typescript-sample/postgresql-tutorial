import { json } from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import mysql from 'mysql';
import { Pool } from 'pg';
import { createContext } from './init';
import { route } from './route';

dotenv.config();

const app = express();

const port = process.env.PORT;
const password = process.env.PASSWORD;

app.use(json());

// const pool = mysql.createPool({
//   host: '127.0.0.1',
//   port: 3306,
//   user: 'root',
//   password,
//   database: 'masterdata',
//   multipleStatements: true,
// });

// pool.getConnection((err, conn) => {
//   if (err) {
//     console.error('Failed to connect to MySQL.', err.message, err.stack);
//   }
//   if (conn) {
//     const ctx = createContext(pool);
//     route(app, ctx);
//     http.createServer(app).listen(port, () => {
//       console.log('Start server at port ' + port);
//     });
//     console.log('Connected successfully to MySQL.');
//   }
// });

export const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  password: 'postgres',
  database: 'masterdata',
  port: 5432
});

const ctx = createContext(pool);
route(app, ctx);
http.createServer(app).listen(port, () => {
  console.log('Start server at port ' + port);
});
