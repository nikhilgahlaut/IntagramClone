// require('dotenv').config()
// const express = require('express')
// const connectToDb = require('./config/db.js')
// const userRoutes = require('./Routes/userRoutes.js')
// const cors = require('cors')
// const cookieParser = require('cookie-parser')

// const app = express()
// connectToDb();
// app.use(cookieParser())
// app.use(cors())
// app.use(express.urlencoded({extended:true}))
// app.use(express.json())
// app.use('/api/auth',userRoutes)


// module.exports = app
require('dotenv').config()
const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const cors = require('cors')
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

const connectToDb = require('./config/db.js')
connectToDb()

const userRoutes = require('./routes/userRoutes.js')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/auth/',userRoutes)


module.exports = app