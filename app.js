const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];


// Write code to use inquirer to gather information about the development team members,

const init = () => {
    inquirer.prompt([
        {
            message : 'Choose employee type: ',
            type : 'list',
            choices : ['Engineer', 'Intern', 'Manager'],
            name : 'role'
        },
        {
            message : 'Employee name: ',
            name : 'name'
        },
        {
            message : 'Employee email address: ',
            name : 'email'
        },
        {
            message : 'Employee IDnum: ',
            name : 'id'
        }
    ]).then(emp => {
        let name = emp.name;
        let email = emp.email;
        let id = emp.id;
        switch (emp.role) {
            case 'Engineer':
                // engineer prompts
                promptEngineer(name, id, email);
                break;
            case 'Intern':
                // intern prompts
                promptIntern(name, id, email);
                break;
            case 'Manager':
                //manager prompts
                promptManager(name, id, email);
                break;
        }
    })
}
// and to create objects for each team member (using the correct classes as blueprints!)
function promptEngineer(name, id, email) {
    inquirer.prompt([
        {
            message : 'Enter GitHub username: ',
            name : 'username'
        }
    ]).then( res => {
        let username = res.username;
        let engEmp = new Engineer(name, id, email, username);
        // put engineer somehwere
        employees.push(engEmp);
        promptForEmp();
    })
};

function promptIntern(name, id, email) {
    inquirer.prompt([
        {
            message : 'School: ',
            name : 'school'
        }
    ]).then( res => {
        let school = res.school;
        let schEmp = new Intern(name, id, email, school);
        // put intern somewhere
        employees.push(schEmp);
        promptForEmp();
    })
}

function promptManager(name, id, email) {
    inquirer.prompt([
        {
            message : 'Enter office phone number: ',
            name : 'phone'
        }
    ]).then( res => {
        let phone = res.phone;
        let manEmp = new Manager(name, id, email, phone);
        // put manager somewhere
        employees.push(manEmp);
        promptForEmp();
    })
}

function promptForEmp() {
    inquirer.prompt([{
        message : 'Would you like to add another employee?',
        name : 'addAnother',
        type : 'confirm',
        default : false
    }]).then( res => {
        if (res.addAnother) {
            init();
        }
    })
}

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
