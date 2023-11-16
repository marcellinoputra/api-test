import express, { Express } from 'express';
import dotenv from 'dotenv';
import Routes from './routes';
import { PrismaClient } from '@prisma/client';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3500;
const prisma = new PrismaClient();

Routes(app);

app.listen(port, () => {
  prisma
    .$connect()
    .then(() => {
      console.log('Database is connected');
    })
    .catch((err) => {
      console.log(`Database is not connected: ${err}`);
    });
  console.log(`Server is running on port ${port} || Happy Code 🔥`);
});
