import express from 'express';
import tasks_routes from './routes/tasks.js';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/api', tasks_routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
