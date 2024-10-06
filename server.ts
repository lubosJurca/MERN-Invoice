import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import cookieParser from 'cookie-parser';

import userRouter from './routes/userRouter.js';
import invoiceRouter from './routes/invoiceRouter.js';
import authRouter from './routes/authRouter.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app: Express = express();
const port = process.env.PORT || 5100;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ------------ ROUTES ------------
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/invoices', invoiceRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')));
  // this is for vite to work
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

// ------------ ERROR HANDLING ------------
app.use('*', (req, res) => {
  res.status(404).send({ msg: 'Not found' });
});

app.use(errorHandlerMiddleware);

try {
  await mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => console.log('connected to mongo'))
    .catch((err) => console.error(err));

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
