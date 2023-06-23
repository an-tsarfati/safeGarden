const express = require('express');
const user = require('./user.routes');
const kindergarden = require('./user.routes');
const attendance = require('./attendance.routes');

const router = express.Router();

router.get('/statusCheck', (_, res) => res.status(200).json({ status: 'OK' }));

router.use('/users', user);
router.use('/kindergarden/', kindergarden);
router.use('/', attendance);

module.exports = router;
