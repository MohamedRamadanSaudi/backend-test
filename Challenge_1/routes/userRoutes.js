const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const auth = require('../middlewares/AuthMiddleware');

router.post('/', auth.auth, auth.isAdmin, authController.createUser);
router.get('/', auth.auth, auth.isAdmin, userController.getUsers);

module.exports = router