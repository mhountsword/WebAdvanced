import express from 'express';
import cors from 'cors';

const app = express()
const port = 3000

import auth from './routes/auth.js';
import itemsController from './routes/items.js';

app.use(cors());
app.use(express.json());

app.use("/api/auth", auth); //logging in & out, registering
app.use("/api/items", itemsController); //getting & adding items

app.get('/', (req, res) => {
  res.json({ msg: "Welcome to the backend API."});
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})