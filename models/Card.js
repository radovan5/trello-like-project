const mongoose = require('mongoose')

const CardSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: 'To do',
  },
  user: {
    type: String,
    default: 'Unassigned',
  },
})

module.exports = mongoose.model('card', CardSchema)
