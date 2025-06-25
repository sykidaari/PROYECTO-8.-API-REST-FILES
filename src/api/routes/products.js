const upload = require('../../middlewares/imageUpload');
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

productsRouter.post('/', [upload.single('img')], postProduct);
productsRouter.put('/:id', [upload.single('img')], putProduct);
productsRouter.delete('/:id', deleteProduct);

module.exports = productsRouter;
