const db = require('./connection/connection');
const inquirer = require('inquirer');
const table = require('console.table');

db.connect(function (err) {
    if (err) throw err;
    console.log('Wrong');
    mainMenu();
})

//Main menu questions for routes
function mainMenu() {
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

            } else if (choices === 'View all roles') {
                viewRoles();

            } else if (choices === 'View all employees') {
                viewEmployees();

            } else if (choices === 'Add department') {
                addDepartment();

            } else if (choices === 'Add role') {
                addRole();

            } else if (choices === 'Add employee') {
                addEmployee();

            } else if (choices === 'Update an employee role') {
                updateEmployee();

            } else if (choices === 'Update employee manager') {
                updateManager();

            } else if (choices === 'View employees by manager') {
                viewEmployeeManager();

            } else if (choices === 'View employees by department') {
                viewDepartmentEmployees();

            } else if (choices === 'Delete Department') {
                deleteDepartment();

            } else if (choices === 'Delete role') {
                deleteRole();

            } else if (choices === 'Delete employee') {
                deleteEmployee();

            } else if (choices === 'View department budget') {
                viewDepartmentBudget();

            } else if (choices === 'quit') {
                quit();
            }
        })
};

//--------------------------- View ---------------------------------
//View all departments
function viewDepartments() {
    const sql = `SELECT department.id AS id, department.dep_name AS department FROM department`;
    db.promise().query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

//View all employees
function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.dep_name AS 'department', 
    role.salary FROM employee, employee_role, department 
    WHERE department.id = role.department.id
    AND role.id = employee.employee_role.role_id`;
    db.promise().query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

//View all roles
function viewRoles() {
    const sql = `SELECT employee_role.id, employee_role.title, department.dep_name AS department 
    FROM employee_role
    INNER JOIN department ON employee_role.department_id = department.id`;
    db.promise().query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

//--------------Bonus: View by manager and view by department-----------
function viewEmployeeManager() {
    const sql = `SELECT employee.first_name, employee.last_name, employee.manager_id AS department 
    FROM employee
    LEFT JOIN role ON employee.role_id = role_id
    LEFT JOIN department ON employee_role.manager_id = manager.id`;
    db.promise().query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

function viewDepartmentEmployees() {
    const sql = `SELECT employee.first_name, employee.last_name, department.dep_name AS department
    FROM employee
    LEFT JOIN role ON employee_role ON employee.role_id = employee_role.id
    LEFT JOIN department ON employee_role.dep_id = department.id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

function viewDepartmentBudget() {
    const sql = `SELECT dep_id AS id, 
    department.dep_name AS department,
    SUM(salary) AS budger
    FROM role 
    INNER JOIN department ON employee_role.dep_id GROUP BY employee_role.dep_id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

//----------------------------- Add -----------------------------------
//Add a department 
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'depName'
        }
    ]).then(function (res) {
        const sql = `INSERT INTO department (dep_name) VALUES(?)`;
        db.query(sql, res.newDepartment, (err, res) => {
            if (err) throw err;
            console.table(res);
            console.log("Department sucessfully added");
            viewDepartments();
        })
    })
}

//Adding a role 
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role',
            name: 'role'
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'money'
        },
        {
            type: 'input',
            message: 'What department does the role belong to?',
            name: 'depRole'
        }
    ]).then(function (res) {
        db.query("INSERT INTO employee_role (title) VALUES (title, salary, dep_id)", res.employee_role, function (err, res) {
            if (err) throw err;
            console.table(res);
            console.log("Department sucessfully added");
            mainMenu();
        })
    })
}

//Add employee
function addEmployee() {
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
}

//----------------------- Bonus: Update --------------------------------

function updateEmployee() {

    mainMenu();
}

//----------------------- Bonus: Delete ----------------------------------
function deleteDepartment() {

    mainMenu();
}

function deleteRole() {

    mainMenu();
}

function deleteEmployee() {

    mainMenu();
}

//------------------------------- End ----------------------------
function quit() {

};
