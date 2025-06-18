const {
  getBrands,
  getBrandById,
  postBrand,
  putBrand,
  deleteBrand
} = require('../controllers/brands');

const brandsRouter = require('express').Router();

brandsRouter.get('/:id', getBrandById);
brandsRouter.get('/', getBrands);

brandsRouter.post('/', postBrand);
brandsRouter.put('/:id', putBrand);
brandsRouter.delete('/:id', deleteBrand);

module.exports = brandsRouter;
