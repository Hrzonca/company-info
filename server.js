const db = require('./connection/connection');
const inquirer = require('inquirer');
const table = require('console.table');


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


db.connect(function (err) {
    if (err) throw err;
    console.log('Wrong');
    mainMenu();
})

//questions
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
                'quit'
            ],
                name: 'whatDoYouWant'
            }
        ]).then((answer) => {
            const choices = answer;
            if (choices === 'View all departments') {
                //create function that will display a table with depatment names an ids
                viewDepartment();
            } else if (choices === 'View all roles') {
                //create function that displays a table of job title, role id, the department that the role belongs to, and the the salary for that role
                viewRoles();
            } else if (choices === 'View all employees') {
                //create function that will display a table with employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
                viewEmployees();
            } else if (choices === 'Add department') {
                //create function that will add the department to the database
                addDepartment();
            } else if (choices === 'Add role') {
                //create function that allows you to enter a name, salary, and department for that role and that it was added to the database
                addRole();
            } else if (choices === 'Add employee') {
                //create function that prompts to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
                addEmployee();
            } else if (choices === 'Update an employee role') {
                // create function prompts to select an employee to update and their new role and this information is updated in the database
                updateEmployee();
            }
        })
};

//async function for each choice. db each to the database. add follow up questions in these functions
function viewDepartment() {
    db.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.table(data);
        mainMenu();
    })
}

function viewEmployees() {
    db.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        console.table(data);
        mainMenu();
    })
}

function viewRoles() {
    db.query("SELECT * FROM employee_role", function (err, data) {
        if (err) throw err;
        console.table(data);
        mainMenu();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'depName'
        }
    ]).then(function (res) {
        db.query("INSERT INTO department (dep_name) VALUES (?)", res.department, function (err, data) {
            if (err) throw err;
            console.table(data);
            console.log("Department sucessfully added");
            mainMenu();
        })
    })
}

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
        //not sure if that is correct for the values and i need to db the depatment id to the department table
        db.query("INSERT INTO employee_role (title) VALUES (title, salary, dep_id)", res.employee_role, function (err, data) {
            if (err) throw err;
            console.table(data);
            console.log("Department sucessfully added");
            mainMenu();
        })
    })
}

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
        //not sure if that is correct for the values and i need to db the depatment id to the department table
        db.query("INSERT INTO employee VALUES (first_name, last_name, role_id(db to role(id)), )", res.employee, function (err, data) {
            if (err) throw err;
            console.table(data);
            console.log("Department sucessfully added");
            mainMenu();
        })
    })
}

//     {
//       type: 'input',
//       message: "Which employye's role do you want to update?",
//       name: 'updateRole'
//     }
//   ]);

  //how ever they answer, they are promted with they are taken to the next question 
