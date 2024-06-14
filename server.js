const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
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

app.use(`${APISTORE}`, productRoutes);

app.use(errorMiddleware);

app.listen(PORT || 3000);
