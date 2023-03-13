const mongoose = require('mongoose')


const connectDB = () => {
   const DB_URL = "mongodb://localhost:27017/Ecomapp"
     mongoose.set('strictQuery', true).connect(DB_URL).then((data)=>{
        console.log(`cooneced db ${data.connection.host}`)
     })
}

module.exports = connectDB