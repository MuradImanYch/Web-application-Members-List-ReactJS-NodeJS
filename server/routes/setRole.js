const express = require('express');
const router = express.Router();
const controller = require('../controllers/setRole');

router.post('/admin', controller.admin);
router.post('/removeAdm', controller.removeAdm);

module.exports = router;