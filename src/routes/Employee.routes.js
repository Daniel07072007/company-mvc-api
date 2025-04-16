const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/Employee.controller');


router.get('/all', employeeController.getEmployees);
router.post('/add', employeeController.addEmployee);
router.put('/update-salary', employeeController.updateSalary);
router.get('/max-salary/:departmentId', employeeController.getEmployeeSalaryMaxByDepartmentId);