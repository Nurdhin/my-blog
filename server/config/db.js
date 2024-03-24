const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    const conn = await mongoose.createConnection(process.env.MONGODB_URI)
    conn.getClient()
    console.log(`Database Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB
