const express = require('express');
const mysql = require('mysel2');
const dotenv  = require('process');
 
const PORT = process.env || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//connst to the index.js

//remove the server file because it is not needed, just use the index.js file 
//functionality
//   * Update employee managers.
// * View employees by manager.
// * View employees by department.
// * Delete departments, roles, and employees.
// * View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.
