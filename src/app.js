const express = require('express')
const app = express()
const userRouter = require('./routers/user.router')
const productRouter = require('./routers/product.router')
const errorMiddleware = require('./middlewares/errorMiddleware')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/auth',userRouter)
app.use('/api/product',productRouter)

app.use(errorMiddleware)

module.exports=  app