


const EmployeeOf = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        employeeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'employee_id'
        },
        employeeName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'employee_name'
        },
        salary: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            field: 'salary'
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'department_id'
        }
    },
    {
        tableName: 'employees',
        timestamps: false
    });
    
    return Employee;
}

module.exports = EmployeeOf;
