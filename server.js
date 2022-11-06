const express = require('express');
const inquirer = require('inquirer')
const mysql = require('mysel2');
 
const PORT = process.env || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '1234567890',
      database: 'thecompany_db'
    },
    console.log(`Connected to thecompany_db database.`)
  );

  app.use


//functionality
//   * Update employee managers.
// * View employees by manager.
// * View employees by department.
// * Delete departments, roles, and employees.
// * View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.