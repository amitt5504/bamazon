var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    superVisor();
});

function superVisor() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Product Sales by Department",
                "Create New Department",
                "Exit"
            ]
        }).then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    departmentSales();
                    break;

                case "Create New Department":
                    newDepartment();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function departmentSales() {
    var query = "SELECT d.department_name, d.over_head_cost, d.department_id,"
    + " SUM(p.product_sales) AS product_sales ";
	query += "FROM departments as d INNER JOIN products as p ";
	query += "ON d.department_name = p.department_name ";
	query += "GROUP BY department_id ";
    connection.query(query, function(err, res) {
        if (err) throw err;
        // console.log(res);
        // console.log("---")
        for (var i = 0; i < res.length; i++) {
            var profit = parseInt(res[i].product_sales) - parseInt(res[i].over_head_cost);
            console.log("Department #: " + res[i].department_id + " || Department: " + res[i].department_name + " || Overhead Cost: " + res[i].over_head_cost + " || Product Sales: " + res[i].product_sales + " || Total Profit: " + profit);
            console.log("---")
        }
        superVisor();
    });

}

function newDepartment() {
    inquirer.prompt([{
        name: "department",
        type: "input",
        message: "Name of the new Department"
    },
    {
        name: "overhead",
        type: "input",
        message: "What is the over head cost for the Department"
    }]).then(function (answer) {
        connection.query("INSERT INTO departments SET ?",
        {
          department_name: answer.department,
          over_head_cost: answer.over_head_cost
        },
        function(err) {
            if (err) throw err;
            console.log("New Department successfully added");
            // re-prompt the user for if they want to bid or post
            superVisor();
        });   
    });
}