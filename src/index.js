const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const endpoints = require('./routes')

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('dev')); //peticiomes y middle wares
app.use(express.json()); //devuelve JSONs

app.use('/api', endpoints);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});