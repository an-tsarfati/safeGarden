const {
  createKindergarden,
  deleteKindergarden,
  findAndUpdateKindergarden,
  readKindergarden,
} = require('../services/kindergarden.service');

exports.newKindergarden = catchAsync(async (req, res, next) => {
  const newUser = await createKindergarden(req.body);

  createSendToken(newUser, 201, res);
});

exports.deleteKindergarden = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedKindergarden = await deleteKindergarden({ _id: id });
  if (!deletedKindergarden) res.status(400).json('Kindergarden not deleted');
  res.status(200).json('Kindergarden deleted');
});

exports.getKindergarden = (popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = readKindergarden(req.params.id);
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
