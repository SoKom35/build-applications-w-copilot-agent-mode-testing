import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';

app.use(express.json());

app.get('/', (req, res) => res.send('OctoFit Tracker API'));

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
