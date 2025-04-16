const express = require('express');
const router = express.Router();
const employeeRoutes = require('./Employee.routes');
const departmentRoutes = require('./departmentRoutes');

router.use('/employees', employeeRoutes);
router.use('/departments', departmentRoutes);

module.exports = router;