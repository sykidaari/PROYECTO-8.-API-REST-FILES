const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },

    animalType: {
      type: String,
      required: true,
      enum: ['dog', 'cat', 'bird', 'fish', 'rodent', 'reptile']
    },
    weightClass: {
      type: String,
      enum: ['small', 'medium', 'large']
    },
    ageGroup: {
      type: String,
      enum: ['young', 'adult', 'senior']
    },
    category: {
      type: String,
      enum: ['dry-food', 'wet-food', 'snack', 'toy', 'util']
    },

    description: { type: String },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands',
      required: true
    }
  },
  { timestamps: true, collection: 'products' }
);

const Product = mongoose.model('products', productSchema, 'products');
module.exports = Product;
