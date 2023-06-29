const { UserModel } = require('../models/user.model');

async function createUser(input) {
  return await UserModel.create(input);
}

async function findUser(filter) {
  return await UserModel.findOne(filter).select('+password').exec();
}

async function getUser(query) {
  return await UserModel.findById(query);
}

module.exports = {
  createUser,
  findUser,
  getUser,
};
