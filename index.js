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
            "choice 1",
            "choice 2",
        ]}
    ])
    .then((answers)=>{
        //viewall employees()
        console.log("answers: ", answers)
        if(answers.choice === "choice 1"){
            viewAllEmployees()
        }
    })

//prompts for main menu fo here

//if statements viewallempyoees()
//unless user selects quit

}

const viewAllEmployees = () => {
    console.log("viewing all employees")
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT* FROM department", function (err, result, fields) {
          if (err) throw err;
          console.log(result);



          homeMenu()
        });
      });
}













homeMenu();

// con.query (use this to display user request)
//view all employees function()
//call homemenu()
