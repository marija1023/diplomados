const express = require('express');
const router = express.Router();
const path = require('path');

const controller = require(path.relative("__dirname", "../controllers/categoriesController.js"));

// http://localhost:3000/categories/id
router.get('/:id', controller.getCategoryById);

// http://localhost:3000/categories
router.get('/', controller.getCategories);

// http://localhost:3000/categories
router.post('/', controller.createCategory);


module.exports = router;

