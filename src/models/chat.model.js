const mongoose = require('mongoose');
const chatValidationSchema = require('../validations/chat.validation');

const chatSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    kindergartenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'kindergarden',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    massege: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: {
      type: Date,
      default: Date.now,
    },
    kindergarden: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Kindergarden',
        required: true,
      },
    ],
  }
);

const chatModel = mongoose.model('chat', chatSchema);

module.exports = {
  chatModel,
  chatValidationSchema,
};
