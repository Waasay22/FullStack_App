const express = require('express')
const router = express.Router()
const productController = require('../controller/product')
router.post('/',productController.createProduct)
.get('/',productController.getAllProducts)
.get('/:id',productController.getProduct)
.put('/:id',productController.updateProduct)
.patch('/:id',productController.updatePatchProduct)
.delete('/:id',productController.deleteProduct)

exports.router = router