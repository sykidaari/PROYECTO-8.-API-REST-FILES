require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const brandsRouter = require('./src/api/routes/brands');
const productsRouter = require('./src/api/routes/products');

const app = express();

app.use(express.json());

connectDB();

app.use('/api/v1/brands', brandsRouter);
app.use('/api/v1/products', productsRouter);

app.use((req, res) => res.status(404).json('route not found'));

app.listen(3000, () => {
  console.log('server connected at http://localhost:3000/');
});
