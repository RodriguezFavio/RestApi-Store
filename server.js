const express = require('express');
require('dotenv').config();

const productRoutes = require('./routes/products');

const app = express();
const { PORT, APISTORE } = process.env;

app.use(express.json());

app.use(`${APISTORE}`, productRoutes);

app.listen(PORT);
