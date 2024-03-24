const {
  createKindergarden,
  deleteKindergarden,
  findAndUpdateKindergarden,
  readKindergarden,
  readAllClasses,
} = require('../services/kindergarden.service');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.newKindergarden = catchAsync(async (req, res, next) => {
  const userId = req.body.userId;

  const doc = await createKindergarden(req.body);
  const populateKindergarden = await readKindergarden(createKindergarden._id);

  res.status(201).json({
    status: 'success',
    data: {
      data: populateKindergarden,
    },
  });
});

exports.deleteKindergarden = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedKindergarden = await deleteKindergarden({ _id: id });
  if (!deletedKindergarden) res.status(400).json('Kindergarden not deleted');
  res.status(200).json({ message: 'Kindergarden deleted' });
});

exports.getKindergarden = catchAsync(async (req, res, next) => {
  const doc = await readKindergarden(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.updateKindergarden = catchAsync(async (req, res, next) => {
  const doc = await findAndUpdateKindergarden(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getAllClasses = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.classId) filter = { class: req.params.classId };

  const doc = await readAllClasses(filter, req.query);

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});
