const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    tier: {
      type: String,
      enum: ['economy', 'standard', 'premium'],
      default: 'standard'
    },
    description: { type: String, required: true },

    img: { type: String, required: true }
  },
  { timestamps: true, collection: 'brands' }
);

const Brand = mongoose.model('brands', brandSchema, 'brands');

module.exports = Brand;
