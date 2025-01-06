const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true
    },
    category: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
      min: [0, 'Price must be a positive number']
    },
    quantity: {
      type: Number,
      required: [true, 'A product must have a quantity'],
      min: [0, 'Quantity cannot be negative'],
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be an integer'
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', ProductSchema); 