const app = require("./app")
const dotenv = require('dotenv')
const connectDB = require("./config/db");
const Razorpay = require("razorpay");


// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

// Config
dotenv.config({path:'backend/config/config.env'})
connectDB()

new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

const server = app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}`))

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});

app.get('/', (req, res) => res.send('Hello World!'))