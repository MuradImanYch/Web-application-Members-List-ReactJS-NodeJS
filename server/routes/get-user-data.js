const express = require('express');
const router = express.Router();
const controller = require('../controllers/get-user-data');

router.post('/', controller.getUserData);

module.exports = router;