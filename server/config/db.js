const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
      const conn = await mongoose.connect('mongodb+srv://jobilite2021:babatunde@cluster0.06ezsxy.mongodb.net/BLOG')
    console.log(`Database Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB
