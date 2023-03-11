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

        // Add new Employee
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
                // Insert employee data into db
                ]).then((answers) => {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
                        employee_tracker();
                    });
                })
            });

        // Add new role
        } else if (answers.prompt === 'Add A Role') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'role',
                        message: 'Enter role title: ',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;
                            } else {
                                console.log('Please enter a valid title.');
                                return false;
                            }
                        }
                    },
                    {
                        // Add department for new role
                        type: 'list',
                        name: 'department',
                        message: 'Enter department for this role: ',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].name);
                            }
                            return array;
                        }
                    },
                    {
                        // Add salary for new role
                        type: 'input',
                        name: 'salary',
                        message: 'Enter salary for this role: ',
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;
                            } else {
                                console.log('Please enter a valid salary.');
                                return false;
                            }
                        }
                    }
                // Insert role into database
                ]).then((answers) => {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].name === answers.department) {
                            var department = result[i];
                        }
                    }
                    db.query(`INSERT INTO role (title, department_id, salary) VALUES (?, ?, ?)`, [answers.role, department.id, answers.salary], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.role} to the database.`)
                        employee_tracker();
                    });
                })
            })

            // Add a department
        } else if (answers.prompt === 'Add A Department') {
            inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'What is the name of the dpeartment?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please Add A Department!');
                        return false;
                    }
                }
            }]).then((answers) => {
                db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to the database.`)
                    employee_tracker();
                });
            })
            
            // Update an employee role
        } else if (answers.prompt === 'Update Employee Role') {
                
             db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;
    
                inquirer.prompt([
                    {
                            // Choose an Employee by last name to Update
                        type: 'list',
                        name: 'employee',
                        message: 'Select an employee to update: ',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].last_name);
                            }
                            var employeeArray = [...new Set(array)];
                            return employeeArray;
                        }
                    },
                    {
                        // Update the role
                        type: 'list',
                        name: 'role',
                        message: 'Select their new title: ',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    }
                ]).then((answers) => {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].last_name === answers.employee) {
                             var name = result[i];
                            }
                        }
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                            }
                        }
                        
                        // Update employee role
                    db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: name}], (err, result) => {
                        if (err) throw err;
                        console.log(`Updated ${answers.employee} role to the database.`)
                        employee_tracker();
                    });
                })
            });

            // Log out
        } else if (answers.prompt === 'Log Out') {
            db.end();
            console.log("Good-Bye!");
        }
    })
};
