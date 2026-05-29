require('dotenv').config()
const app = require("./src/app")
const connectDB = require("./src/config/db")
const port = 3000

connectDB()
app.listen(()=>{
    console.log(`server running Port ${port}`)
})

