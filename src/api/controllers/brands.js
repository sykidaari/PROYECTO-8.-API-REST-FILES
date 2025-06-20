const handleError = require('../../utils/errorHandler');
const Brand = require('../models/brand');

const getBrands = async (req, res) => {
  try {
    const { tier } = req.query;

    const validTiers = ['economy', 'standard', 'premium'];

    if (tier && !validTiers.includes(tier)) {
      return handleError({
        res,
        error: new Error('invalid tier in req.query'),
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

    if (!brand) {
      return handleError({
        res,
        error: new Error('brand not found'),
        reqType: 'GET',
        controllerName: 'getBrandById',
        action: 'check if brand exists in DB'
      });
    }

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

    return res.status(201).json({
      message: 'brand posted successfully',
      brand: savedBrand
    });
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

const putBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);
    if (!brand) {
      return handleError({
        res,
        error: new Error('brand does not exist in DB'),
        reqType: 'PUT',
        controllerName: 'putBrand',
        action: 'check if brand exists in DB'
      });
    }

    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({
      message: 'brand updated successfully',
      brand: updatedBrand
    });
  } catch (error) {
    handleError({
      res,
      error,
      reqType: 'PUT',
      controllerName: 'putBrand',
      action: 'update brand in DB'
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);
    if (!brand) {
      return handleError({
        res,
        error: new Error('brand does not exist in DB'),
        reqType: 'DELETE',
        controllerName: 'deleteBrand',
        action: 'check if brand exists in DB'
      });
    }

    const deletedBrand = await Brand.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'brand deleted successfully',
      brand: deletedBrand
    });
  } catch (error) {
    handleError({
      res,
      error,
      reqType: 'DELETE',
      controllerName: 'deleteBrand',
      action: 'delete brand in DB'
    });
  }
};

module.exports = { getBrands, getBrandById, postBrand, putBrand, deleteBrand };
