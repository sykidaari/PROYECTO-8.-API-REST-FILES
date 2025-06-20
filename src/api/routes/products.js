const {
  getProducts,
  getProductById,
  getProductsByAnimalType,
  getProductsByBrand,
  postProduct,
  putProduct,
  deleteProduct
} = require('../controllers/products');

const productsRouter = require('express').Router();

productsRouter.get('/:id', getProductById);
productsRouter.get('/animal/:animalType', getProductsByAnimalType);
productsRouter.get('/brand/:brandId', getProductsByBrand);
productsRouter.get('/', getProducts);

productsRouter.post('/', postProduct);
productsRouter.put('/:id', putProduct);
productsRouter.delete('/:id', deleteProduct);

module.exports = productsRouter;
