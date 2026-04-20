import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccount.json');

// npm i --save-dev @types/cors

import { initializeApp, cert } from 'firebase-admin/app';

import userRouter from './routes/userRoutes.ts';
import taskRouter from './routes/taskRoute.ts';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

initializeApp({
  credential: cert(
    serviceAccount
  )
});

//DB
export const db = getFirestore();

//AUTH
export const auth = getAuth();

export const usersCollection = db.collection('users');
export const tasksCollection = db.collection('tasks');

const port = 3001;
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ROUTES
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.get('/', (req, res) => {
  res.send("API Working");
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})