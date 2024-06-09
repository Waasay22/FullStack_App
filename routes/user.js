const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
router.post('/',userController.createUser)
.get('/',userController.getAllUsers)
.get('/:id',userController.getUser)
.put('/:id',userController.updateUser)
.patch('/:id',userController.updatePatchUser)
.delete('/:id',userController.deleteUser)

exports.router = router