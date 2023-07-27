const { ChildModel } = require('../models/child.model');

async function deleteChild(query) {
  return ChildModel.deleteOne(query).lean();
}
async function readChild(query) {
  return await ChildModel.findById(query)
    .populate('parent') // Exclude password from parent details
    .populate('kindergarten');
}
async function creatChild(input) {
  return await ChildModel.create(input);
}
async function findAndUpdateChild(query, update, options) {
  return ChildModel.findByIdAndUpdate(query, update, options);
}
async function readAllChildren() {
  return ChildModel.find(filter);
}

module.exports = {
  creatChild,
  deleteChild,
  findAndUpdateChild,
  readAllChildren,
  readChild,
};
