const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const {
  createKindergardenClass,
  findAndUpdateKindergardenClass,
  deleteKindergardenClass,
  getAllKindergardenClasses,
  getClass,
} = require('../services/kindergarden.service');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await deleteKindergardenClass(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await findAndUpdateKindergardenClass(req.params.id, req.body, {
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

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const kindergarden = await createKindergardenClass({
      kindergardenName: req.body.kindergardenName,
      kindergardenAddress: req.body.kindergardenAddress,
      kindergardenAuthority: req.body.kindergardenAuthority,
      kindergardenClasses: req.body.kindergardenClasses,
      kindergardenWorkHours: req.body.kindergardenWorkHours,
    });

    res.status(201).json({
      status: 'success',
      data: {
        data: kindergarden,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = getClass(req.params.id);
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

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on kindergardenClass (hack)
    let filter = {};
    if (req.params.kindergardenClassId)
      filter = { kindergardenClass: req.params.kindergardenClassId };

    const features = new APIFeatures(getAllKindergardenClasses, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
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
