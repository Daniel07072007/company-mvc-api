# Company MVC API

API REST para la gestión de empleados y departamentos de una empresa.

## Instalación

1. Clonar el repositorio
```bash
git clone <repository-url>
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
Crear un archivo `.env` con las siguientes variables:
```
DB_NAME=your_database
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
```

4. Iniciar el servidor
```bash
npm start
```

## Endpoints

### Empleados

- GET `/api/employees/all` - Obtener todos los empleados
- POST `/api/employees/add` - Crear nuevo empleado
- PUT `/api/employees/update-salary/:id` - Actualizar salario de un empleado
- GET `/api/employees/max-salary/:departmentId` - Obtener empleado con mayor salario por departamento
- GET `/api/employees/top-by-department` - Obtener empleados mejor pagados por departamento
