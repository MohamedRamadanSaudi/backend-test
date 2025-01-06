const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create Product
exports.createProduct = catchAsync(async (req, res, next) => {

  // Check if product name is already taken
  const product = await Product.findOne({ name: req.body.name });
  if (product) {
    return next(new AppError('Product with this name already exists', 400));
  }

  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { product }
  });
});

// Get All Products with Pagination
exports.getProducts = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await Product.find()
    .skip(skip)
    .limit(limit)
    .sort('price');

  const total = await Product.countDocuments();

  res.status(200).json({
    status: 'success',
    results: products.length,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: { products }
  });
});

// Get Single Product
exports.getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { product }
  });
});

// Update Product
exports.updateProduct = catchAsync(async (req, res, next) => {

  // Check if product exists
  const existingProduct = await Product.findById(req.params.id);
  if (!existingProduct) {
    return next(new AppError('No product found with that ID', 404));
  }

  // Check if product name is already taken by a different product
  if (req.body.name) {
    const productWithName = await Product.findOne({
      name: req.body.name,
      _id: { $ne: req.params.id }
    });
    if (productWithName) {
      return next(new AppError('Product with this name already exists', 400));
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    data: { product: updatedProduct }
  });
});

// Delete Product
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
}); 