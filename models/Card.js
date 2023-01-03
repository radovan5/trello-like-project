const mongoose = require('mongoose')

const CardSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  status: {
    type: String,
  },
  user: {
    type: String,
  },
})

module.exports = mongoose.model('card', CardSchema)
