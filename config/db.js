const mongoose = require('mongoose')
const config = require('config')
// this grabs value from default.json
const db = config.get('mongoURI')

mongoose.set('strictQuery', false)

const connectDB = async () => {
  try {
    await mongoose.connect(db)
    console.log('MongoDB connected...')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
