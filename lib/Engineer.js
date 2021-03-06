// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
let Employee = require('./Employee.js');

class Engineer extends Employee {
    constructor(name, id, email, githubName) {
        super(name, id, email);
        this.github = githubName;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return 'Engineer';
    }
}

module.exports = Engineer;