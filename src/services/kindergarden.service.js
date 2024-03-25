const { KindergardenModel } = require('./../models/kindergarden.model');
const APIFeatures = require('../utils/apiFeatures');

async function findAndUpdateKindergarden(query, update, options) {
  return KindergardenModel.findByIdAndUpdate(query, update, options);
}
async function deleteKindergarden(query) {
  return KindergardenModel.deleteOne(query).lean();
}

async function readKindergarden(query) {
  return await KindergardenModel.findById(query)
    .populate('director') // Exclude password from parent details
    .populate('children');
}

async function createKindergarden(input) {
  try {
    console.log('Request body:', input); // Log the request body
    const { children, ...rest } = input; // Extracting children from input
    console.log('Extracted children:', children); // Log the extracted children
    console.log('Remaining data:', rest); // Log the remaining data

    const kindergartenData = { ...rest };

    // Ensure children is an array and contains valid ObjectIds
    if (children && Array.isArray(children)) {
      kindergartenData.children = children;
    }

    console.log('Kindergarten data:', kindergartenData); // Log the final kindergarten data

    const newKindergarden = await KindergardenModel.create(kindergartenData);

    // Populate the director and children fields
    const populateKindergarden = await readKindergarden(newKindergarden._id);

    return populateKindergarden;
  } catch (error) {
    throw new Error('Error creating kindergarden: ' + error.message);
  }
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
