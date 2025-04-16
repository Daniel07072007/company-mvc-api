const DepartmentOf = (sequelize, DataTypes) => {
    const Department = sequelize.define('Department', {
        departmentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'department_id'
        },
        departmentName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'department_name'
        }
    },
    {
        tableName: 'departments',
        timestamps: false
    });
    
    return Department;
}

module.exports = DepartmentOf;
