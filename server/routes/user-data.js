const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-data');

router.post('/', controller.username);
router.post('/save-data', controller.save);
router.get('/get-department', controller.getDepartment);
router.post('/find-by-department', controller.findByDepartment);
router.post('/delete', controller.delete);
router.post('/save-admin-changed-data', controller.saveAdminChangeData);

module.exports = router;