const express = require('express');
const router = express.Router();
const controller = require('../controllers/get-departments');

router.get('/departments', controller.departments);
router.get('/job-titles', controller.jobTitles);

module.exports = router;