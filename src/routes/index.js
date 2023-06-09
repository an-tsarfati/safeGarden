const express = require('express');
const user = require('./user.routes');
const kindergarden = require('./user.routes');
const attendance = require('./attendance.routes');
const chat = require('./chat.routes');

const router = express.Router();

router.get('/statusCheck', (_, res) => res.status(200).json({ status: 'OK' }));

router.use('/api/users', user);
router.use('/api/kindergarden/', kindergarden);
router.use('/', attendance);
router.use('/api/messages', chat);

module.exports = router;
