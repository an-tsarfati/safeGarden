const { UserModel } = require('../models/user.model');

async function createUser(input) {
  return await UserModel.create(input);
}

const findUser = async (filter) => {
  const user = await UserModel.findOne(filter).select('+password').exec();
  return user;
};

module.exports = {
  createUser,
  findUser,
};
