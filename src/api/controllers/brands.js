const handleError = require('../../utils/errorHandler');
const Brand = require('../models/brand');

const getBrands = async (req, res) => {
  try {
    const { tier } = req.query;

    const validTiers = ['economy', 'standard', 'premium'];

    if (tier && !validTiers.includes(tier)) {
      return handleError({
        res,
        error: new Error('Invalid tier in req.query'),
        reqType: 'GET',
        controllerName: 'getBrands',
        action: 'validate tier'
      });
    }

    const filter = tier ? { tier } : {};

    const brands = await Brand.find(filter);

    return res.status(200).json(brands);
  } catch (error) {
    handleError({
      res,
      error,
      reqType: 'GET',
      controllerName: 'getBrands',
      action: 'fetch brands from DB'
    });
  }
};

getBrandById = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);

    return res.status(200).json(brand);
  } catch (error) {
    handleError({
      res,
      error,
      reqType: 'GET',
      controllerName: 'getBrandById',
      action: 'fetch brand with _id from DB'
    });
  }
};

const postBrand = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    const savedBrand = await newBrand.save();

    return res.status(200).json(savedBrand);
  } catch (error) {
    handleError({
      res,
      error,
      reqType: 'POST',
      controllerName: 'postBrand',
      action: 'upload new brand to DB'
    });
  }
};

module.exports = { getBrands, getBrandById, postBrand };
