const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
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

exports.updateUser = catchAsync(async (req, res, next) => {
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
    const user = await readUser(req.params.id, popOptions);

    if (!user) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: user,
      },
    });
  });

exports.getAllUsers = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.userId) filter = { user: req.params.userId };

  const users = await readAllUsers(filter, req.query);

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      data: users,
    },
  });
});
