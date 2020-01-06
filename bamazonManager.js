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
    manage();
});

function manage() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "exit"
            ]
        }).then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewInventory();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addProduct();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function viewInventory() {

    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item #: " + res[i].item_id + " || Item: " + res[i].product_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock);
        }
        console.log("-------");
        manage();
    });
}

function lowInventory() {

    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock < 5) {
                console.log("Item #: " + res[i].item_id + " || Item: " + res[i].product_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock);
            }
        }
        console.log("-------");
        manage();
    });
}

function addInventory() {

    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item #: " + res[i].item_id + " || Item: " + res[i].product_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock);
        }
        console.log("-------");

        inquirer.prompt([
            {
                name: "item",
                type: "input",
                message: "Please select an item"
            }, 
            {
                name: "quantity",
                type: "input",
                message: "How many more to add to the inventory?"
            }])
            .then(function (answer) {
                connection.query("SELECT * from products WHERE ?", {
                    item_id: answer.item
                }, function (err, results) {
                    if (err) throw err;
                    var newStock = parseInt(results[0].stock) + parseInt(answer.quantity);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                            stock: newStock
                        },
                        {
                            item_id: answer.item
                        }],
                        function (error) {
                            if (error) throw err;
                        }
                        
                    );
                    manage();
                })
            });
        
    }) 
}

function addProduct() {
    
    inquirer.prompt([{
        name: "product",
        type: "input",
        message: "Name of the product"
    },
    {
        name: "price",
        type: "input",
        message: "What is the cost of the product"
    },
    {
        name: "quantity",
        type: "input",
        message: "How much of the product is available"
    },
    {
        name: "department",
        type: "input",
        message: "Product Deparment"
    }]).then(function (answer) {
        connection.query("INSERT INTO products SET ?",
        {
          product_name: answer.product,
          department_name: answer.department,
          price: answer.price,
          stock: answer.quantity
        },
        function(err) {
            if (err) throw err;
            console.log("New item successfully added");
            // re-prompt the user for if they want to bid or post
            manage();
        });   
    });
}
