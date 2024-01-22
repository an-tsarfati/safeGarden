const express = require('express');
const user = require('./user.routes');
const kindergarden = require('./kindergarden.routes');
const attendance = require('./attendance.routes');
const child = require('./child.routes');
// const dailyImage = require('./dailyImages.routes');

const router = express.Router();

router.get('/statusCheck', (_, res) => res.status(200).json({ status: 'OK' }));

router.use('/users', user);
router.use('/kindergarden', kindergarden);
router.use('/', attendance);
router.use('/child', child);
// router.use('/daily-photos', dailyImage);

module.exports = router;
