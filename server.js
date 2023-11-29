const inquirer = require ("inquirer");
const con= require("./db/connection")

//starting home menu function. after user makes a selection and completes another function this should run again
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
        if(answers.choice === "View All Roles"){
            viewRoles();
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
    // tutor assisted with const query as I was stuck here
    const query= `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id=role.id LEFT JOIN department on role.department_id=department.id LEFT JOIN employee manager on manager.id=employee.manager_id`
        con.query(query, function (err, result) {
          if (err) throw err;
          console.table(result);
          homeMenu()
        });
}

const addEmployee = () => {
    con.query("SELECT * FROM role", (err, data)=>{
    
        let roles= data.map((role)=>({
            name:role.title,
            value:role.id
        }))

        con.query("SELECT * FROM employee", (err, data)=>{
            let managers= data.map((manager)=>({
                name: `${manager.first_name}  ${manager.last_name}`,
                value: manager.id
            }))
       
   
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
            name: "role",
            message: "Please select Role:",
            choices: roles
        
        },
        {
            type: "list",
            name: "manager",
            message: "Please select Manager",
            choices: managers
        
        },
       
    ])
    .then(employee => {
        const sql = "INSERT INTO employee SET ?";
        const values = {first_name:employee.firstName, last_name:employee.lastName, role_id:employee.role, manager_id:employee.manager};

            con.query(sql, values, function (err, result) {
                if (err) throw err;
                homeMenu();
            });});
        })
    })};

    const viewRoles=()=>{
        console.log("function found");
        const query=`SELECT role.id, role.title, department.dept_name AS department, role.salary FROM role LEFT JOIN department on role.department_id=department.id`
        con.query(query, (err, data)=>{
            console.log("connected");
            if(err) throw err;
            console.table(data)
            homeMenu();
        })
    }
    const addRole = () => {
        con.query("SELECT * FROM department", (err, data) => {
            if (err) throw err;
    
            let departments = data.map((department) => ({
                name: department.dept_name,
                value: department.id
            }));
    
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the new title:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter Salary for this title:'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select Department:',
                    choices: departments
                }
            ])
    
            .then(answers => {
                const sql = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
                const values = [answers.title, answers.salary, answers.department_id];
    
                con.query(sql, values, function (err, result) {
                    if (err) throw err;
                    console.log("Role added successfully.");
                    homeMenu();
                });
            });});};

        const viewAllDepartments = () => {
            console.log("viewing all departments")
    
                con.query("SELECT* FROM department", function (err, result) {
                    if (err) throw err;
                    console.table(result);
                    homeMenu()});}

                    const updateEmployeeRole = () => {
                        con.query("SELECT * FROM role", (err, data) => {
                            if (err) throw err;
                    
                            let roles = data.map((role) => ({
                                name: role.title,
                                value: role.id
                            }));
                    
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'id',
                                    message: 'Enter the employee ID#:'
                                },
                                {
                                    type: 'list', 
                                    name: 'roleid',
                                    message: 'Select their new Role:',
                                    choices: roles
                                }
                            ])
                    
                            .then(answers => {
                                const sql = "UPDATE employee SET role_id = ? WHERE id = ?";
                                const values = [answers.roleid, answers.id];
                    
                                con.query(sql, values, function (err, result) {
                                    if (err) throw err;
                                    console.log("Employee role updated successfully.");
                                    homeMenu();
                                });});});};
            homeMenu();
            
            
            




        





// con.query (use this to display user request)
//view all employees function()
//call homemenu()
