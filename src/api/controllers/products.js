const handleError = require('../../utils/errorHandler');
const validateProductQuery = require('../../utils/productQueryValidator');
const Brand = require('../models/brand');
const Product = require('../models/product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('brand');

    return res.status(200).json(products);
  } catch (error) {
    handleError({
      res,
      error,
      reqType: 'GET',
      controllerName: 'getProducts',
      action: 'fetch products from DB'
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate('brand');

    if (!product) {
      return handleError({
        res,
        error: new Error('product not found'),
        reqType: 'GET',
        controllerName: 'getProductById',
        action: 'check if product exists in DB'
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    handleError({
      res,
      error,
      reqType: 'GET',
      controllerName: 'getProductById',
      action: 'fetch product with _id from DB'
    });
  }
};

const getProductsByAnimalType = async (req, res) => {
  try {
    const { animalType } = req.params;
    const filter = { animalType };

    const productQuery = validateProductQuery({
      query: req.query,
      allowedFields: ['weightClass', 'ageGroup', 'category'],
      res,
      controllerName: 'getProductsByAnimalType',
      reqType: 'GET'
    });

    if (!productQuery) return;

    Object.assign(filter, productQuery.filter);

    const products = await Product.find(filter).populate('brand');

    return res.status(200).json(products);
  } catch (error) {
    handleError({
      res,
      error,
      reqType: 'GET',
      controllerName: 'getProductByAnimalType',
      action: 'fetch product with specified animalType from DB'
    });
  }
};

const getProductsByBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const filter = { brand: brandId };

    const productQuery = validateProductQuery({
      query: req.query,
      allowedFields: ['animalType', 'weightClass', 'ageGroup', 'category'],
      res,
      controllerName: 'getProductsByBrand',
      reqType: 'GET'
    });

    if (!productQuery) return;

    Object.assign(filter, productQuery.filter);

    const products = await Product.find(filter).populate('brand');

    return res.status(200).json(products);
  } catch (error) {
    handleError({
      res,
      error,
      reqType: 'GET',
      controllerName: 'getProductByBrand',
      action: 'fetch product with specified brand from DB'
    });
  }
};

const postProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    const populatedProduct = await savedProduct.populate('brand');

    return res.status(201).json({
      message: 'product posted successfully',
      product: populatedProduct
    });
  } catch (error) {
    handleError({
      res,
      error,
      reqType: 'POST',
      controllerName: 'postProduct',
      action: 'upload new product to DB'
    });
  }
};

const putProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return handleError({
        res,
        error: new Error('product does not exist in DB'),
        reqType: 'PUT',
        controllerName: 'putProduct',
        action: 'check if product exists in DB'
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    }).populate('brand');

    return res.status(200).json({
      message: 'product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    handleError({
      res,
      error,
      reqType: 'PUT',
      controllerName: 'putProduct',
      action: 'update product in DB'
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return handleError({
        res,
        error: new Error('product does not exist in DB'),
        reqType: 'DELETE',
        controllerName: 'deleteProduct',
        action: 'check if product exists in DB'
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id).populate(
      'brand'
    );

    return res.status(200).json({
      message: 'product deleted successfully',
      product: deletedProduct
    });
  } catch (error) {
    handleError({
      res,
      error,
      reqType: 'DELETE',
      controllerName: 'deleteProduct',
      action: 'delete product in DB'
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByAnimalType,
  getProductsByBrand,
  postProduct,
  putProduct,
  deleteProduct
};
