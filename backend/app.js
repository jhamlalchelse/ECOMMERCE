const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error')
const app = express()
const bodyParser = require("body-parser")
const path = require('path')

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require('dotenv').config({path:'backend/config/config.env'})
}

app.use(
    cors({
      origin: ["http://localhost:3000", 'http://127.0.0.1:3000'],
      credentials: true,
      sameSite: "none",
    })
  );
// cookie-parser
app.use(cookieParser())
app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Router
const productRoutes = require('./routes/productRoutes')
app.use('/api/v1', productRoutes)
const userRoutes = require('./routes/userRoutes')
app.use('/api/v1', userRoutes)
const orderRouters = require('./routes/orderRoutes')
app.use('/api/v1', orderRouters)

const paymentRoutes = require('./routes/paymentRoutes')
app.use('/api/v1', paymentRoutes)

// Error Middleware
app.use(errorMiddleware)

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports = app