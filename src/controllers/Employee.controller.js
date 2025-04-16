const db = require('../models');
const Employee = db.Employee;

const getEmployees = async (_req, res) => {
    try {
        const employees = await Employee.findAll();
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({ 
            error: 'Internal Server Error',
            message: error.message,
            details: 'Error al obtener la lista de empleados'
        });
    }
}

const addEmployee = async (req, res) => {
    try {
        const { employeeName, salary, departmentId } = req.body;
        const newEmployee = await Employee.create({ employeeName, salary, departmentId });
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', message: error });
    }
}
const updateSalary = async(req, res) => {
    try {
        const { id } = req.params;
        const { salary } = req.body;
        const employee = await Employee.findByPk(id);
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

const getTopEmployeesByDepartment = async (_req, res) => {
    try {
        const [results] = await db.sequelize.query(`
            WITH RankedEmployees AS (
                SELECT 
                    e.*,
                    d.department_name,
                    ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC, e.employee_name) as rn
                FROM Employees e
                INNER JOIN Departments d ON e.department_id = d.department_id
            )
            SELECT 
                employee_id,
                employee_name,
                salary,
                department_id,
                department_name
            FROM RankedEmployees 
            WHERE rn = 1
        `);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ 
            error: 'Internal Server Error',
            message: error.message
        });
    }
}

module.exports = {
    getEmployees,
    addEmployee, 
    updateSalary,
    getEmployeeSalaryMaxByDepartmentId,
    getTopEmployeesByDepartment
}

