const express = require('express');
const { getChatMessages } = require('../controllers/chat.controller');
const validate = require('../middleware/validateResource');
const chatValidationSchema = require('../validations/chat.validation');

const router = express.Router();

router.post('/', validate(chatValidationSchema), getChatMessages);

module.exports = router;
