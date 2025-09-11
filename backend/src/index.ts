import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import tasks_routes from './routes/tasks.js';

const app = express();

app.use(bodyParser.json());
app.use('/api', tasks_routes);

(async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  app.listen(process.env.PORT);
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
})();