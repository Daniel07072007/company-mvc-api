const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const endpoints = require('./routes')

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', endpoints);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});