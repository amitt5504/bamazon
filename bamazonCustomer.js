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
    customer();
});

function customer() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products",
                "Exit"
            ]
        }).then(function (answer) {
            switch (answer.action) {
                case "View Products":
                    purchase();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function purchase() {
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item #: " + res[i].item_id + " || Item: " + res[i].product_name + " || Price: " + res[i].price);
        }


        inquirer
            .prompt([{
                name: "item",
                type: "input",
                message: "Which item would you like to purchase?"
            }, {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?"
            }])
            .then(function (answer) {          
                // console.log(answer.choice);
                //console.log(answer.quantity);
                connection.query("SELECT * from products WHERE ?", {
                    item_id: answer.item
                }, function (err, results) {
                    if (err) throw err;
                   
                    if (results[0].stock < answer.quantity) {
                        console.log("Insuffient Quantity. Order cannot be fulfilled");
                    } else {
                        var total = parseInt(results[0].price) * answer.quantity;
                        //console.log(results[0].price)
                        console.log("Your order is being processed. The total amount is $" + total);
                        var newStock = parseInt(results[0].stock) - answer.quantity;
                        var productTotal = parseInt(results[0].product_sales) + total;
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [{
                                    stock: newStock,
                                    product_sales: productTotal
                                },
                                {
                                    item_id: answer.item
                                }
                            ],
                            function (error) {
                                if (error) throw err;
                                customer();
                            }
                        );
                    }

                })

            });
    })
}