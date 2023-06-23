const { UserModel } = require('../models/user.model');

async function createUser(input) {
  try {
    const newUser = new UserModel(input);
    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    // Handle the error appropriately
    throw error;
  }
}

const findUser = async (filter) => {
  const user = await UserModel.findOne(filter).select('+password').exec();
  return user;
};

async function getUser(query) {
  return await UserModel.findById(query);
}

module.exports = {
  createUser,
  findUser,
  getUser,
};
