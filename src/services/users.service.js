const UserModel = require('../models/user.model');

async function findAndUpdateUser(query, update, options) {
  return UserModel.findByIdAndUpdate(query, update, options);
}

module.exports = {
  findAndUpdateUser,
};
