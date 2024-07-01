const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const customerRoutes = require('./routes/customers');
const categoryRoutes = require('./routes/categories');
const orderRoutes = require('./routes/orders');
const { errorMiddleware } = require('./middleware/error');

const app = express();

const { PORT, APISTORE, WHITE_LIST } = process.env;

const corsOptions = {
  origin: (origin, callback) => {
    if (WHITE_LIST.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(`${APISTORE}`, categoryRoutes);

app.use(`${APISTORE}`, productRoutes);

app.use(`${APISTORE}`, userRoutes);

app.use(`${APISTORE}`, customerRoutes);

app.use(`${APISTORE}`, orderRoutes);

app.use(errorMiddleware);

app.listen(PORT || 3000);
