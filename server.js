const db = require('./config/connection');
const inquirer = require('inquirer');
const { response } = require('express');
const { lastValueFrom } = require('rxjs');
require('console.table');


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
                    'View budget',
                    'Update an employee role'
                ],
                name: 'whatDoYouWant'
            }
        ]).then((answer) => {
            const choices = answer.whatDoYouWant;  // { whatDoYouWant: ""}
            console.log(choices);
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
            if (choices === 'View budget') {
                viewDepartmentBudget();
            }
        })
};

//--------------------------- View ---------------------------------
//View all departments
const viewDepartments = () => {

    //console.log("In View departments function")
    let sql = `SELECT department.id AS id, department.dep_name AS department FROM department;`;
    // let sql = `SELECT * FROM department;`;
    db.query(sql, (error, response) => {
        if (error) throw error;
        // console.log(response);
        console.table(response);
        mainMenu();
    })
};

//ONLY SHOWING 1 EMPLOYEE
//View all employees
const viewEmployees = () => {
    let sql = `SELECT employee.id,
    employee.first_name, 
    employee.last_name, 
    employee_role.title, 
    department.dep_name AS 'department', 
    employee_role.salary 
    FROM employee, employee_role, department 
    WHERE department.id = employee_role.dep_id
    AND employee_role.id = employee.role_id;`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        // console.log(typeof res);
        console.table(res);
        mainMenu();
    })
};

//View all roles
const viewRoles = () => {
    let sql = `SELECT employee_role.id, employee_role.title, department.dep_name AS department 
    FROM employee_role
    JOIN department ON employee_role.dep_id = department.id;`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        //console.log(res);
        console.table(res);
        mainMenu();
    })
};

// //--------------Bonus: View by manager and view by department-----------
// const viewEmployeeManager = () => {
//     let sql = `SELECT employee.first_name, employee.last_name, employee.manager_id AS department 
//     FROM employee
//     JOIN role ON employee.role_id = role_id
//     LEFT JOIN department ON employee_role.manager_id = manager.id;`;
//     db.query(sql, (err, res) => {
//         if (err) throw err;
//         console.table(res);
//         mainMenu();
//     })
// };

// const viewDepartmentEmployees = () => {
//     let sql = `SELECT employee.first_name, employee.last_name, department.dep_name AS department
//     FROM employee
//     LEFT JOIN role ON employee_role ON employee.role_id = employee_role.id
//     LEFT JOIN department ON employee_role.dep_id = department.id;`;
//     db.query(sql, (err, res) => {
//         if (err) throw err;
//         console.table(res);
//         mainMenu();
//     })
// };

const viewDepartmentBudget = () => {
    let sql = `SELECT dep_id FROM employee_role AS id, 
    department.dep_name AS department,
    SUM(salary) AS budget,
    FROM employee_role;`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
};



async function chooseRole() {
    var roleArray = [];
    try {
        const res = await db.promise().query("SELECT * FROM employee_role")
        console.log(res);
        for (var i = 0; i < res[0].length; i++) {
            
            roleArray.push(res[0][i].title);
        }
        return roleArray;
    } catch (err) {
        console.log(err)
        throw err
    }
}



async function chooseManager() {
    var managerArray = [];
    try {
    const res = await db.promise().query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL")
    console.log(res)
        for (var i = 0; i < res[0].length; i++) {
            managerArray.push(res[0][i].title);
        }
       return managerArray; 
    } catch (err) {
        console.log(err)
        throw err
    }
    
}

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
        db.query(sql, res.depName, (err, res) => {
            if (err) throw err;
            console.table(res);
            console.log("Department sucessfully added");
            viewDepartments();
        })
    })
};
//Add employee
const addEmployee = async () => {
    const roles = await chooseRole()
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the the employee's first name?",
            name: 'firstName'
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'lastName'
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            name: 'role',
            choices: roles
        }
    ]).then(function (val) {
        let roleId = val.roles
        db.query("INSERT INTO employee SET ?",
            {
                first_name: val.firstName,
                last_name: val.lastName,
                role_id: roleId,
               

            }, function (err) {
                if (err) throw err
                console.table(val)
                addManager();
            })
    
    })
    };
   

// const addRole = () => {
//     let sql = 'SELECT * FROM department';
//     db.query(sql, (err, res) => {
//     if (err) throw err;
//     const departmentAdd = [];
//     res.forEach((department) => { departmentAdd.push(department.dep_name); });

//     db.query("SELECT employee_role.title AS title, employee_role.salary AS salary, department.dep_name AS roleDep FROM employee_role AND department", (err, res) => {
//         inquirer.prompt ([
//             {
//                 type: 'input',
//                 message: 'What is the name of the role',
//                 name: 'title'
//             },
//             {
//                 type: 'input',
//                 message: 'What is the salary of the role?',
//                 name: 'salary'
//             },
//             {
//                 type: 'list',
//                 message: "What department does this role belong to?",
//                 name: 'roleDep',
//                 choices: departmentAdd
//             }
//         ]).then((res) => {
//             db.query("INSERT INTO employee_role SET ?",
//             {
//                 title: res.title,
//                 salary: res.salary

//             }, function(err) {
//                 if (err) throw err
//                 console.table(res);
//                 mainMenu();
//             })
//         })
//     })
// }}
//Adding a role 
const addRole = () => {
    let sql = 'SELECT * FROM department';
    db.query(sql, (err, res) => {
        if (err) throw err;
        const departmentAdd = [];

        //showing departments in json form
        //console.log(res);

        res.forEach((department) => { departmentAdd.push(department.dep_name) });
        departmentAdd.push('New department')

        //showing a list of departments
        //console.log(departmentAdd);

        inquirer.prompt([
            {
                type: 'list',
                message: 'What department does the role belong to?',
                name: 'depRole',
                choices: departmentAdd
            }

        ]).then((answer) => {
            if (answer.depRole === 'New department') {
                addDepartment();
            } else {
                addRoleInfo();
            }
        })
    })
};

const addRoleInfo = (newDepData) => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'createdRole'
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'money'
            }
        ])
        .then((answer) => {
            let newRole = answer.createdRole;
            let depId;

            //GETS STUCK HERE
            res.forEach((department) => {
                if (newDepData.depRole === department.dep_name) { depId = department.id; }
            });

            let sql = `INSERT INTO employee_role (title, salary, dep_id) VALUES (?, ?, ?)`;
            let newInfo = [newRole, answer.money, depId];

            db.query(sql, newInfo, (err) => {
                if (err) throw err;
                console.log("Role sucessfully added");
                mainMenu();
            })
        })
};
//-----------------------  Update --------------------------------
//w
const updateEmployee = () => {
    db.query("SELECT employee.last_name, employee_role.title FROM employee JOIN employee_role ON employee.role_id = employee_role.id", function (err, res) {
        if (err) throw err
        console.log(res)
        inquirer.prompt([
            {
                type: "rawlist",
                name: "lastName",
                choices: function () {
                    let lastName = [];
                    for (let i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the employee's last name?",
            },
            {
                type: 'rawlist',
                name: "role",
                message: "What is the employee's new title?",
                choices: chooseRole()
            }
        ]).then(function (val) {
            let roleId = chooseRole().indexOf(val.role) + 1
            db.query("UPDATE employee SET WHERE ?",
                {
                    last_name: lastValueFrom.lastName
                },
                {
                    roleId: roleId
                },
                function (err) {
                    if (err) throw err
                    console.table(val)
                    mainMenu()
                }
            )
        })
    })
};



