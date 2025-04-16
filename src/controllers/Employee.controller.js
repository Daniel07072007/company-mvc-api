const { Employee } = require('../models/Employee.model');

const getEmployees = async (_req, res) => {
    try {
        const employees = await Employee.findAll();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addEmployee = async (req, res) => {
    try {
        const { employeeName, salary, departmentId } = req.body;
        const newEmployee = await Employee.create({ employeeName, salary, departmentId });
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const updateSalary = async(req, res) => {
    try {
        const { employeeId, salary } = req.body;
        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        employee.salary = salary;
        await employee.save();
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getEmployeeSalaryMaxByDepartmentId = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const employee = await Employee.findOne({
            where: { departmentId },
            order: [['salary', 'DESC']]
        });
        if (!employee) {
            return res.status(404).json({ error: 'No employees found for this department' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getEmployees,
    addEmployee, 
    updateSalary,
    getEmployeeSalaryMaxByDepartmentId
}

