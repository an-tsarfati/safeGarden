const { UserModel } = require('../models/user.model');
const APIFeatures = require('../utils/apiFeatures');

async function findAndUpdateUser(query, update, options) {
  return await UserModel.findByIdAndUpdate(query, update, options);
}
async function deleteOneUser(query) {
  return await UserModel.deleteOne(query).lean();
}

async function readAllUsers(filter, query) {
  const mongoQuery = UserModel.find(filter); // Create a valid MongoDB query object using the User model

  const features = new APIFeatures(mongoQuery, query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;
  return users;
}

async function readUser(id, popOptions) {
  let query = User.findById(id);
  if (popOptions) query = query.populate(popOptions);
  const user = await query;

  return user;
}

module.exports = {
  findAndUpdateUser,
  deleteOneUser,
  readUser,
  readAllUsers,
};
