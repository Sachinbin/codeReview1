const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createProductController } = require('../controllers/product.controller')
const router = express.Router()

router.get('/',authMiddleware,(req,res)=>{
    // console.log(req.user)
    res.send(req.user)
})

router.post('/',authMiddleware,createProductController)
module.exports = router