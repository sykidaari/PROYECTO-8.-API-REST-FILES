require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const cloudinary = require('cloudinary').v2;
const brandsRouter = require('./src/api/routes/brands');
const productsRouter = require('./src/api/routes/products');

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY
});

app.use(express.json());

connectDB();

app.use('/api/v1/brands', brandsRouter);
app.use('/api/v1/products', productsRouter);

app.use((req, res) => res.status(404).json('route not found'));

app.listen(3000, () => {
  console.log('server connected at http://localhost:3000/');
});
