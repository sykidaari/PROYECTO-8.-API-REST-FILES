const upload = require('../../middlewares/imageUpload');
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

brandsRouter.post('/', [upload.single('img')], postBrand);
brandsRouter.put('/:id', [upload.single('img')], putBrand);
brandsRouter.delete('/:id', deleteBrand);

module.exports = brandsRouter;
