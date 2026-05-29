const express = require('express')
const app = express()
const userRouter = require('./routers/user.router')
const errorMiddleware = require('./middlewares/errorMiddleware')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',userRouter)

app.use(errorMiddleware)

module.exports=  app