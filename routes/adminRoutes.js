const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const auth = require('../middlewares/AuthMiddleware');

router.post('/', authController.seedAdmin);

module.exports = router