import express from 'express';
import cors from 'cors';
const app = express()
const port = 3000

import auth from './routes/auth.js';
app.use(cors());
app.use(express.json());
app.use("/auth", auth);

app.get('/', (req, res) => {
  console.log(req);
  res.json({ msg: "Welcome to the backend API."});
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})