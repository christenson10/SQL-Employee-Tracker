const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./db/connection');
console.table();

//Menu Function
const menuPrompts = () => {
inquirer.
    prompt({
        name: 'question',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all Departments',
            'View all Roles',
            'View all Employees',
            'Add Deparment',
            'Add Role',
            'Add Employee',
            'Exit'
        ]
    })
    .then(response => {
        if (response.question === 'View all Departments') {
            viewDepartment();
        }
        if (response.question === 'View all Roles') {
            viewRole();
        }
        if (response.question === 'View all Employees') {
            viewEmployees();
        }
        if (response.question === 'Add Deparment') {
            addDepartment();
        }
        if (response.question === 'Add Role') {
            addRole();
        }
        if (response.question === 'Add Employee') {
            addEmployee();
        }
        if (response.question === 'Exit') {
            return;
        }
    });
};

menuPrompts();

//View Department
const viewDepartment = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        menuPrompts();
    });
};

//View Role
const viewRole = () => {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        menuPrompts();
    });
};

//View Employee
const viewEmployees = () => {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.table(res);
        menuPrompts();
    });
};

//Add Department
const addDepartment = async () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What do you want your department name to be?',
        },
    ])
    .then((answer) => {
        connection.query(
            "INSERT INTO department(name) VALUES(?)",
            [answer.name],
            (err, res) => {
                console.table(res);
                menuPrompts();
            }
        );
    });
};

//Add Role
const addRole = () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What role would you like to add?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the roles salary?',
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the roles department ID?',
        },
    ])
    .then((answer) => {
        connection.query(
            `INSERT INTO role (title, salary, department_id)
            VALUES ('${answer.title}', '${answer.salary}', '${answer.departmentId}')`,
            (err, res) => {
                menuPrompts();
            }
        );
    });
};

//Add Employee
const addEmployee = () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employees last name?',
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the employees role ID?',
        },
        {
            type: 'input',
            name: 'managersId',
            message: 'What is the employees managers ID?',
        },
    ])
    .then((answer) => {
        connection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.roleId}', '${answer.managersId}')`,
            (err, res) => {
                console.table(res);
                menuPrompts();
            }
        );
    });
};