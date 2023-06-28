const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const {
  findAndUpdateUser,
  deleteOneUser,
  readUser,
  readAllUsers,
} = require('../services/users.service');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await findAndUpdateUser(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await findAndUpdateUser(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteOneUser({ _id: id });
  if (!deletedUser) res.status(400).json('User not deleted');
  res.status(200).json('user deleted');
});

exports.getUser = (popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = readUser(req.params.id);
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

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // To allow for nested GET reviews on kindergardenClass (hack)
  let filter = {};
  if (req.params.kindergardenClassId)
    filter = { kindergardenClass: req.params.kindergardenClassId };

  const features = new APIFeatures(readAllUsers, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doc = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});

// Do NOT update passwords with this!
exports.updateUser = catchAsync(async (req, res, next) => {
  const doc = await findAndUpdateUser(req.params.id, req.body, {
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
