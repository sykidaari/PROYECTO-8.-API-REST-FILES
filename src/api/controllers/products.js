const mongoose = require('mongoose');
const handleError = require('../../utils/errorHandler');
const validateProductQuery = require('../../utils/productQueryValidator');
const Brand = require('../models/brand');
const Product = require('../models/product');
const deleteCloudinaryImg = require('../../utils/cloudinaryImgDeleter');

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

    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return handleError({
        res,
        error: new Error('invalid brandId format'),
        reqType: 'GET',
        controllerName: 'getProductsByBrand',
        action: 'validate brandId format'
      });
    }

    const brandExists = await Brand.findById(brandId);
    if (!brandExists) {
      return handleError({
        res,
        error: new Error('brand not found'),
        reqType: 'GET',
        controllerName: 'getProductsByBrand',
        action: 'check if brand exists in DB'
      });
    }
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
      controllerName: 'getProductsByBrand',
      action: 'fetch product with specified brand from DB'
    });
  }
};

const postProduct = async (req, res) => {
  try {
    if (!req.file) {
      return handleError({
        res,
        error: new Error('img is required'),
        reqType: 'POST',
        controllerName: 'postProduct',
        action: 'check if file was uploaded'
      });
    }

    const newProduct = new Product({ ...req.body, img: req.file.path });

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

    if (req.file) {
      deleteCloudinaryImg(product.img);
      req.body.img = req.file.path;
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

    deleteCloudinaryImg(deletedProduct.img);

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
