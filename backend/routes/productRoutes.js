const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts,
} = require('../controllers/productController');

const router = express.Router();

router.post(
  '/',
  auth,
  [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('price').isNumeric(),
    body('category').notEmpty(),
    body('stock').isNumeric(),
  ],
  validate,
  createProduct
);

router.get('/', getProducts);

router.get('/my-products', auth, getMyProducts);

router.get('/:id', getProductById);

router.put('/:id', auth, updateProduct);

router.delete('/:id', auth, deleteProduct);

module.exports = router;
