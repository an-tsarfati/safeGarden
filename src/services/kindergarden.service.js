const { filter } = require('compression');
const KindergardenModel = require('../models/kindergarden.model');

async function createKindergardenClass(input) {
  return KindergardenModel.create(input);
}

async function findAndUpdateKindergardenClass(query, update, options) {
  return KindergardenModel.findByIdAndUpdate(query, update, options);
}

async function deleteKindergardenClass(query) {
  return KindergardenModel.findByIdAndDelete({ _id: query });
}

async function getAllKindergardenClasses() {
  return KindergardenModel.find(filter);
}

async function getClass(classId) {
  return KindergardenModel.findById(classId);
}

module.exports = {
  createKindergardenClass,
  findAndUpdateKindergardenClass,
  deleteKindergardenClass,
  getAllKindergardenClasses,
  getClass,
};
