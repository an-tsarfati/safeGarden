const { UserModel } = require('../models/user.model');

async function findAndUpdateUser(query, update, options) {
  return UserModel.findByIdAndUpdate(query, update, options);
}
async function deleteOneUser(query) {
  return UserModel.deleteOne(query).lean();
}

async function readAllUsers() {
  return UserModel.find(filter);
}

async function readUser(query) {
  return await UserModel.findById(query);
}

module.exports = {
  findAndUpdateUser,
  deleteOneUser,
  readUser,
  readAllUsers,
};
