const { KindergardenModel } = require('./../models/kindergarden.model');

async function findAndUpdateKindergarden(query, update, options) {
  return KindergardenModel.findByIdAndUpdate(query, update, options);
}
async function deleteKindergarden(query) {
  return KindergardenModel.deleteOne(query).lean();
}

async function readKindergarden(query) {
  return await KindergardenModel.findById(query);
}
async function creatKindergarden(input) {
  return await KindergardenModel.create(input);
}

module.exports = {
  readKindergarden,
  deleteKindergarden,
  findAndUpdateKindergarden,
  createKindergarden,
};
