const express = require('express');
const router = express.Router();
const controller = require('../controllers/forgot-psw');

router.post('/', controller.forgot);

module.exports = router;