const db = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');


db.connect(function (err) {
    if (err) throw err;
    console.log('Welcome to your company tracker');
    mainMenu();
})

//Main menu questions for routes
const mainMenu = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add department',
                    'Add role',
                    'Add employee',
                    'Update an employee role',
                    'Update employee manager',
                    'View employees by manager',
                    'view employees by department',
                    'Delete department',
                    'Delete role',
                    'Delete employee',
                    'View department budget',
                    'quit'
                ],
                name: 'whatDoYouWant'
            }
        ]).then((answer) => {
            const choices = answer;
            if (choices === 'View all departments') {
                viewDepartments();

            } 
            if (choices === 'View all roles') {
                viewRoles();

            } 
            if (choices === 'View all employees') {
                viewEmployees();

            } 
            if (choices === 'Add department') {
                addDepartment();

            } 
            if (choices === 'Add role') {
                addRole();

            } 
            if (choices === 'Add employee') {
                addEmployee();

            } 
            if (choices === 'Update an employee role') {
                updateEmployee();

            } 
            if (choices === 'Update employee manager') {
                updateManager();

            } 
            if (choices === 'View employees by manager') {
                viewEmployeeManager();

            } 
            if (choices === 'View employees by department') {
                viewDepartmentEmployees();

            } 
            if (choices === 'Delete Department') {
                deleteDepartment();

            } 
            if (choices === 'Delete role') {
                deleteRole();

            } 
            if (choices === 'Delete employee') {
                deleteEmployee();

            } 
            if (choices === 'View department budget') {
                viewDepartmentBudget();

            } 
            if (choices === 'quit') {
                quit();
            }
        })
};

//--------------------------- View ---------------------------------
//View all departments
const viewDepartments = () => {
    let sql = `SELECT department.id AS id, department.dep_name AS department FROM department`;
    db.promise().query(sql, (error, response) => {
        if (error) throw error;
        console.table(response);
        mainMenu();
    })
};

//View all employees
const viewEmployees = () => {
    let sql = `SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    employee_role.title, 
    department.dep_name AS 'department', 
    role.salary 
    FROM employee, employee_role, department 
    WHERE department.id = employee_role.dep_id
    AND employee_role.id = employee.role_id`;
    db.promise().query(sql, (err, res) => {
        if (err) throw err;
        console.table([res]);
        mainMenu();
    })
};

//View all roles
const viewRoles = () => {
    let sql = `SELECT employee_role.id, employee_role.title, department.dep_name AS department 
    FROM employee_role
    INNER JOIN department ON employee_role.department_id = department.id`;
    db.promise().query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
};

//--------------Bonus: View by manager and view by department-----------
const viewEmployeeManager = () => {
    let sql = `SELECT employee.first_name, employee.last_name, employee.manager_id AS department 
    FROM employee
    LEFT JOIN role ON employee.role_id = role_id
    LEFT JOIN department ON employee_role.manager_id = manager.id`;
    db.promise().query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
};

const viewDepartmentEmployees = () => {
    let sql = `SELECT employee.first_name, employee.last_name, department.dep_name AS department
    FROM employee
    LEFT JOIN role ON employee_role ON employee.role_id = employee_role.id
    LEFT JOIN department ON employee_role.dep_id = department.id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
};

const viewDepartmentBudget = () => {
    let sql = `SELECT dep_id AS id, 
    department.dep_name AS department,
    SUM(salary) AS budger
    FROM role 
    INNER JOIN department ON employee_role.dep_id GROUP BY employee_role.dep_id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
};

//----------------------------- Add -----------------------------------
//Add a department 
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'depName'
        }
    ]).then(function (res) {
        let sql = `INSERT INTO department (dep_name) VALUES(?)`;
        db.query(sql, res.newDepartment, (err, res) => {
            if (err) throw err;
            console.table(res);
            console.log("Department sucessfully added");
            viewDepartments();
        })
    })
};

//Adding a role 
const addRole = () => {
    let sql = 'SELECT * FROM department';
    db.query(sql, (err, res) => {
        if (err) throw error;
        const departmentAdd = [];
        response.forEach((department) => { departmentAdd.push(department.dep_name); });
        departmentAdd.push('New department')
    })
    inquirer.prompt([
        {
            type: 'input',
            message: 'What department does the role belong to?',
            name: 'depRole'
        }

    ]).then((answer) => {
        if (answer === 'New department') {
            this.addDepartment();
        } else {
            addRoleInfo();
        }
    })
};

const addRoleInfo = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the role',
                name: 'role'
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'money'
            }
        ])
};

//Add employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the the employee's first name?",
            name: 'firstName'
        },
        {
            type: 'input',
            message: "What is the employee's last name",
            name: 'lastName'
        },
        {
            type: 'input',
            message: "Who is the employee's manager?",
            name: 'manager'
        }
    ]).then(function (res) {
        db.query("INSERT INTO employee VALUES (first_name, last_name, role_id(db to role(id)), )", res.employee, function (err, res) {
            if (err) throw err;
            console.table(res);
            console.log("Department sucessfully added");
            mainMenu();
        })
    })
};

//----------------------- Bonus: Update --------------------------------

const updateEmployee = () => {

    mainMenu();
};

//----------------------- Bonus: Delete ----------------------------------
const deleteDepartment = () => {

    mainMenu();
};

const deleteRole = () => {

    mainMenu();
};

const deleteEmployee = () => {

    mainMenu();
};

//------------------------------- End ----------------------------
const quit = () => {

};
