const express = require('express');
require('dotenv').config();

const productRoutes = require('./routes/products');

const app = express();
const { PORT } = process.env;

app.use(productRoutes);

app.listen(PORT);
