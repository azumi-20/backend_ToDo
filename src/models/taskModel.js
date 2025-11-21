const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',        // Relación
    required: true
  },

  nombreTarea: {
    type: String,
    required: true
  },

  descripTarea: {
    type: String,
    default: null
  },

  fechaInicioTarea: {
    type: Date,
    default: Date.now
  },

  horaTarea: {
    type: String,
    default: null
  },

  estadoTarea: {
    type: String,
    default: null
  }
})

module.exports = mongoose.model('Task', taskSchema)
