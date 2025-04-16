const express = require ('express');
const router = express.Router();
const employeeRouter = require('./EmployeeRoutes');

router.use('/employee', employeeRouter);