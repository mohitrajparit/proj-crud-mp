const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  description: {
    type: String,
    required: [true, 'must provide description'],
    trim: true,
    maxlength: [100, 'Description can not be more than 100 characters'],
  },
})

module.exports = mongoose.model('Task', TaskSchema)