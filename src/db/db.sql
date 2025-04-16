DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL
);

INSERT INTO departments (department_name) VALUES
('Sales'), ('Finance'), ('IT');

INSERT INTO employees (employee_name, salary, department_id) VALUES
('Ana', 5000, 1),
('Juan', 7000, 2),
('María', 6000, 1),
('Pedro', 9000, 3),
('Luisa', 6500, 2);

-- Stored Procedures
DROP PROCEDURE IF EXISTS sp_addEmployee;
DELIMITER $$
CREATE PROCEDURE sp_addEmployee(
    IN p_employee_name VARCHAR(50),
    IN p_salary DECIMAL(10,2),
    IN p_department_id INT
)
BEGIN
    INSERT INTO employees (employee_name, salary, department_id)
    VALUES (p_employee_name, p_salary, p_department_id);
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_updateSalary;
DELIMITER $$
CREATE PROCEDURE sp_updateSalary(
    IN p_employeeId INT,
    IN p_newSalary DECIMAL(10,2)
)
BEGIN
    UPDATE employees
    SET salary = p_newSalary
    WHERE employee_id = p_employeeId;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_employeesMaxSalary;
DELIMITER $$
CREATE PROCEDURE sp_employeesMaxSalary()
BEGIN
    SELECT e.*
    FROM employees e
    WHERE e.salary = (
        SELECT MAX(e2.salary)
        FROM employees e2
        WHERE e2.department_id = e.department_id
    );
END $$
DELIMITER ;