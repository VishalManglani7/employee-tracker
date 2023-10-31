const inquirer = require ("inquirer");
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "supersecure",
  database: "employees_db"
});
const homeMenu = ()=>{
inquirer
    .prompt([
        {type: "list",
        name:"choice",
        choices:[
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Quit",
        ]}
    ])
    .then((answers)=>{
        console.log("answers: ", answers)
        if(answers.choice === "View All Employees"){
            viewAllEmployees();
        }
        if(answers.choice === "Add Employee"){
            addEmployee();
        }
        if(answers.choice === "Update Employee Role"){
            updateEmployeeRole();
        }
        if(answers.choice === "Add Role"){
            addRole();
        }
        if(answers.choice === "View All Departments"){
            viewAllDepartments();
        }
        if(answers.choice === "Quit"){
            quit();}
    });}
//prompts for main menu fo here

//if statements viewallempyoees()
//unless user selects quit

const viewAllEmployees = () => {
    console.log("viewing all employees")
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT* FROM employee", function (err, result) {
          if (err) throw err;
          console.log(result);
          homeMenu()
        });
      });
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter employee first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter employee last name:'
        },
        {
            type: "list",
            name: "choice",
            message: "Please select Role ID:",
            choices: [
                1,
                2,
                3,
                4,]
        },
        {
            type: "list",
            name: "choice",
            message: "Please select Manager ID:",
            choices: [
                1,
                2,
                3,
                4,
                null,]
        },
    ])
    .then(answers => {
        const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        const values = [answers.firstName, answers.lastName, answers.roleId, answers.managerId];

        con.connect(function(err) {
            if (err) throw err;
            con.query(sql, values, function (err, result) {
                if (err) throw err;
                homeMenu();
            });});
    });




}













// con.query (use this to display user request)
//view all employees function()
//call homemenu()
