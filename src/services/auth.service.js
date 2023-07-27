const { UserModel } = require('../models/user.model');
const { ParentModel } = require('../models/parent.model');
const { DirectorModel } = require('../models/director.model');

async function createUser(input) {
  let newUser;

  switch (input.role) {
    case 'parent':
      newUser = await ParentModel.create(input);
      console.log('input:', input);
      break;
    case 'director':
      newUser = await DirectorModel.create(input);
      break;
    default:
      throw new Error('Invalid role provided.');
  }
  console.log('newUser', newUser);

  return newUser;
}

// async function createUser(input) {
//   return await UserModel.create(input);
// }

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
