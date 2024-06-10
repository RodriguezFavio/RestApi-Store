const express = require('express');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const productRoutes = require('./routes/products');
const { createProducts } = require('./database/data');

const app = express();
const { PORT, APISTORE } = process.env;

app.use(express.json());

createProducts(faker, 10)
  .then(() => {
    console.log('initialized products');
  })
  .catch((err) => {
    console.error('Error when initializing products: ', err);
  });

app.use(`${APISTORE}`, productRoutes);

app.listen(PORT);
