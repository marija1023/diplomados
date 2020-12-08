const express = require('express');
const router = express.Router();
const path = require('path');

const controller = require(path.relative("__dirname", "../controllers/authController.js"));

// http://localhost:5000/auth/login
router.post('/login', controller.userLogin);

// http://localhost:5000/auth/register
router.post('/register', controller.userRegister);

// http://localhost:5000/auth/
router.get('/', controller.getIdByUsername);

module.exports = router;
