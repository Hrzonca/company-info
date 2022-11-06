const express = require('express');
const inquirer = require('inquirer')
const mysql = require('mysel2');

  //questions
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: ['Add Department', 'Add Role', 'Add Employee', 'Update Employee Role'],
      name: 'whatYouDoing'
    },
    {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'depName'
    },
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
    },
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
    },
    {
      type: 'input',
      message: "Which employye's role do you want to update?",
      name: 'updateRole'
    }
  ]);

  //how ever they answer, they are promted with they are taken to the next question 
  function renderQuestion(data) {
    let choiceType = data.whatYouDoing;
    let nextQuestion = '';
    if (choiceType === 'Add Department') {
        nextQuestion = 
    }
  }