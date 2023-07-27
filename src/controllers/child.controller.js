const {
  creatChild,
  deleteChild,
  findAndUpdateChild,
  readAllChildren,
  readChild,
} = require('../services/child.service');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.newChild = catchAsync(async (req, res, next) => {
  const parentId = req.body.parentId;
  const kindergardenId = req.body.kindergardenId;

  const newChild = await creatChild(req.body);

  const populatedChild = await readChild(newChild._id);

  res.status(201).json({
    status: 'success',
    data: {
      child: populatedChild,
    },
  });
});

exports.deleteChild = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedChild = await deleteChild({ _id: id });
  if (!deletedChild) res.status(400).json('Child not deleted');
  res.status(200).json('Child deleted');
});

exports.getChild = (popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = readChild(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

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

exports.updateChild = catchAsync(async (req, res, next) => {
  const doc = await findAndUpdateChild(req.params.id, req.body, {
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

exports.getAllchildren = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.childId) filter = { child: req.params.childId };

  const doc = await readAllChildren(filter, req.query);

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});
