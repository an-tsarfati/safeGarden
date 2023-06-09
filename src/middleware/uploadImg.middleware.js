const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.resizeImages = (fileName) =>
  catchAsync(async (req, res, next) => {
    if (!req.files.imageCover || !req.files.images) return next();

    // 1) Cover image
    req.body.imageCover = `${fileName}-${
      req.params.id
    }-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/${fileName}s/${req.body.imageCover}`);

    // 2) Images
    req.body.images = [];

    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `${fileName}-${req.params.id}-${Date.now()}-${
          i + 1
        }.jpeg`;

        await sharp(file.buffer)
          .resize(500, 500)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/img/${fileName}s/${filename}`);

        req.body.images.push(filename);
      })
    );

    next();
  });
