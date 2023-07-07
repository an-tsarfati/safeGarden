const { UserModel } = require('../models/user.model');
const APIFeatures = require('../utils/apiFeatures');

async function findAndUpdateUser(query, update, options) {
  return await UserModel.findByIdAndUpdate(query, update, options);
}
async function deleteOneUser(query) {
  return await UserModel.deleteOne(query).lean();
}

async function readAllUsers(filter, query) {
  const features = new APIFeatures(UserModel.find(filter), query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  return doc;
}

async function readUser(userId, popOptions) {
  let query = UserModel.findById(userId);
  if (popOptions) query = query.populate(popOptions);
  const user = await query.exec();

  return user;
}

module.exports = {
  findAndUpdateUser,
  deleteOneUser,
  readUser,
  readAllUsers,
};
