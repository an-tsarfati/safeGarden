const UserModel = require('../models/user.model');

async function createUser(input) {
  return UserModel.create(input);
}

async function findUser(query, options = { lean: true }) {
  return UserModel.findOne(query, {}, options);
}

async function getUser(query) {
  return await UserModel.findById();
}

module.exports = {
  createUser,
  findUser,
  getUser,
};
