const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createProductController, getProductController, updateProductController } = require('../controllers/product.controller')
const ProductModel = require('../models/product.model')
const router = express.Router()

router.get('/',authMiddleware,getProductController)
router.post('/',authMiddleware,createProductController)
router.put('/update/:id',authMiddleware,updateProductController)
module.exports = router