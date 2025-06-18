const { getBrands, getBrandById, postBrand } = require('../controllers/brands');

const brandsRouter = require('express').Router();

brandsRouter.get('/:id', getBrandById);
brandsRouter.get('/', getBrands);

brandsRouter.post('/', postBrand);

module.exports = brandsRouter;
