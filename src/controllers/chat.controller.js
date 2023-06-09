const Chat = require('../models/chat.model');
const catchAsync = require('../utils/catchAsync');

const getChatMessages = catchAsync(async (req, res) => {
  const { kindergartenId } = req.params;

  // Retrieve all chat messages for the specified kindergarten
  const messages = await Chat.find({ kindergartenId });

  res.json(messages);
});

module.exports = {
  getChatMessages,
};
