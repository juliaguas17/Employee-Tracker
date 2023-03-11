const inquirer = require('inquirer');
const db = require('./db/connection');

db.connect(err => {
    if (err) throw err;
    console.log('Connected to Employee Database!')
    employee_tracker();
});

var employee_tracker = function () {
    inquirer.createPrompt([{
        type: 'list',
        name: 'prompt',
        message: 'Please select from the following options:'
        choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add an Employee', 'Add a Role', 'Add a Department', 'Update Employee Role', 'Log Out']
    }]).then((answers) => {

        // View All Employees
        if (answers.prompt === 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.table(result);
                employee_tracker();
            });

        // View All Roles   
        } else if (answers.prompt === 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.table(result);
                employee_tracker();
                });

        // View All Departments        
        } else if (answers.prompt === 'View All Departments') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.table(result);
                employee_tracker();
                });

        // Add an Employee
        } else if (answers.prompt === 'Add an Employee') {
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        //Employee First name
                        type: 'input',
                        name: 'firstName',
                        message: 'Enter first name: ',
                        validate: firstNameInput => {
                            if (firstNameInput) {
                                return true;
                            } else {
                                console.log('Please enter a valid first name.');
                                return false;
                            }
                        }
                    },
                    {
                        // Employee Last name
                        type: 'input',
                        name: 'lastName',
                        message: 'Enter last name: ',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Please enter a valid last name.');
                                return false;
                            }
                        }
                    },
                    {
                    // Employee Role
                    type: 'list',
                    name: 'role',
                    message: 'Enter job title: ',
                    choices: () => {
                        var array = [];
                        for (var i=0; i < result.length; i++) {
                            array.push(result[i].title);
                        }
                        var newArray = [...new Set(array)];
                        return newArray;
                        }
                    },
                    { 
                    // Employee Manager
                    type: 'input',
                    name: 'manager',
                    message: 'Enter employee manager: ',
                    validate: managerInput => {
                        if (managerInput) {
                            return true;
                        } else {
                            console.log('Enter a valid manager.')
                            return false;
                            }
                        }
                    }
                }
            

        }