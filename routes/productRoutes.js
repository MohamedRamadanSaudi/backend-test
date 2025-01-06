const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/AuthMiddleware');


router.post('/', auth.auth, auth.isAdmin, productController.createProduct);

router.get('/', auth.auth, productController.getProducts);

router.get('/:id', auth.auth, productController.getProductById);

router.put('/:id', auth.auth, auth.isAdmin, productController.updateProduct);

router.delete('/:id', auth.auth, auth.isAdmin, productController.deleteProduct);

module.exports = router;
