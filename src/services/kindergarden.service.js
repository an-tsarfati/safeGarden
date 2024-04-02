const { KindergardenModel } = require('./../models/kindergarden.model');
const APIFeatures = require('../utils/apiFeatures');

async function findAndUpdateKindergarden(query, update, options) {
  return KindergardenModel.findByIdAndUpdate(query, update, options);
}
async function deleteKindergarden(query) {
  return KindergardenModel.deleteOne(query).lean();
}

// async function createKindergarden(input) {
//   return await KindergardenModel.create(input);
// }

async function readKindergarden(query) {
  return await KindergardenModel.findById(query)
    .populate('director')
    .populate('children');
}

async function createKindergarden(input) {
  try {
    const { children, ...rest } = input; // Extracting children from input

    const kindergartenData = { ...rest };

    // Ensure children is an array and contains valid ObjectIds
    if (children && Array.isArray(children)) {
      kindergartenData.children = children;
    }

    const newKindergarden = await KindergardenModel.create(kindergartenData);

    // Populate the director and children fields
    const populateKindergarden = await readKindergarden(newKindergarden._id);

    return populateKindergarden;
  } catch (error) {
    throw new Error('Error creating kindergarden: ' + error.message);
  }
}

async function readKindergarden(query) {
  return await KindergardenModel.findById(query)
    .populate('children')
    .populate('kindergarten');
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
