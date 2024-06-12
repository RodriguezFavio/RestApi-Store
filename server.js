const express = require('express');
require('dotenv').config();

const productRoutes = require('./routes/products');
const { errorMiddleware } = require('./middleware/error');

const app = express();
const { PORT, APISTORE } = process.env;

app.use(express.json());

app.use(`${APISTORE}`, productRoutes);

app.use(errorMiddleware);

app.listen(PORT);
