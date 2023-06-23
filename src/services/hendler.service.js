const { filter } = require('compression');
const { Model } = require('mongoose');

async function createOne(input) {
  return Model.create(input);
}

async function updateOne(query, update, options) {
  return Model.findByIdAndUpdate(query, update, options);
}

async function deleteOne(query) {
  return Model.findByIdAndDelete({ _id: query });
}

async function getAll() {
  return Model.find(filter);
}

async function getOne(classId) {
  return Model.findById(classId);
}

module.exports = {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
};
