const express = require('express');
const inquirer = require('inquirer')
const mysql = require('mysel2');
const { allowedNodeEnvironmentFlags } = require('process');

//questions
inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update an employee role'],
            name: 'whatDoYouWant'
        }
    ]).then((answer) => {
        const choices = answer;
        if (choices === 'View all departments') {
            //create function that will display a table with depatment names an ids
            viewDepartment();
        } else if (choices === 'View all roles') {
            //create function that displays a table of job title, role id, the department that the role belongs to, and the the salary for that role
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
    });

const viewDepartment

//     {
//       type: 'input',
//       message: 'What is the name of the department?',
//       name: 'depName'
//     },
//     {
//       type: 'input',
//       message: 'What is the name of the role',
//       name: 'role'
//     },
//     {
//       type: 'input',
//       message: 'What is the salary of the role?',
//       name: 'money'
//     },
//     {
//       type: 'input',
//       message: 'What department does the role belong to?',
//       name: 'depRole'
//     },
//     {
//       type: 'input',
//       message: "What is the the employee's first name?",
//       name: 'firstName'
//     },
//     {
//       type: 'input',
//       message: "What is the employee's last name",
//       name: 'lastName'
//     },
//     {
//       type: 'input',
//       message: "Who is the employee's manager?",
//       name: 'manager'
//     },
//     {
//       type: 'input',
//       message: "Which employye's role do you want to update?",
//       name: 'updateRole'
//     }
//   ]);

  //how ever they answer, they are promted with they are taken to the next question 
