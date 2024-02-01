const { KindergardenModel } = require('./../models/kindergarden.model');
const APIFeatures = require('../utils/apiFeatures');

async function findAndUpdateKindergarden(query, update, options) {
  return KindergardenModel.findByIdAndUpdate(query, update, options);
}
async function deleteKindergarden(query) {
  return KindergardenModel.deleteOne(query).lean();
}

async function readKindergarden(id) {
  const doc = await KindergardenModel.findById(id).populate({
    path: 'director',
    select: '-__v -passwordChangedAt',
  });

  return doc;
}

async function createKindergarden(input) {
  return await KindergardenModel.create(input);
}

async function readAllClasses(filter, query) {
  const features = new APIFeatures(KindergardenModel.find(filter), query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  return doc;
}

module.exports = {
  readKindergarden,
  deleteKindergarden,
  findAndUpdateKindergarden,
  createKindergarden,
  readAllClasses,
};
