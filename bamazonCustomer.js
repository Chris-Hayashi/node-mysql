var mysql = require("mysql");

var inquirer = require("inquirer");

var Table = require("cli-table");
// var table = new Table({
//     head: ["ID", "Product", "Department", "Price", "Stock"]
// });

var connection = mysql.createConnection({
    host: "Localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
});


var done = false;
function displayAll() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        var table = new Table({
            head: ["ID", "Product", "Department", "Price", "Stock"]
        });

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }

        console.log(table.toString());

        askQuestions();
    });
}

function askQuestions() {

    inquirer.prompt({
        type: "input",
        name: "id",
        message: "What is the ID of the item you would like to purchase? [Quit with Q]"
    }).then(function(answer1) {

        if (answer1.id === "q" || answer1.id === "Q") {
            console.log("Goodbye!");
            process.exit();
        }

        inquirer.prompt({
            type: "input",
            name: "quantity",
            message: "How many would you like? [Quit with Q]"
        }).then(function(answer2) {

            if (answer2.quantity === "q" || answer2.quantity === "Q") {
                console.log("Goodbye!");
                process.exit();
            }
            connection.query("SELECT * FROM products where item_id = ?", answer1.id, function(err, res1) {
                if (err) throw err;
    
                if (answer2.quantity > res1[0].stock_quantity) {
                    console.log("Insufficient quantity!");
                    process.exit();
                } 
                else {
                    connection.query("UPDATE products SET stock_quantity = ?, product_sales = product_sales + ? WHERE item_id = ?", [res1[0].stock_quantity - answer2.quantity, res1[0].price * answer2.quantity, answer1.id], function(err, res2) {
                        if (err) throw err;
    
                        console.log("\nYou successfully purchased " + answer2.quantity + " " + res1[0].product_name + "(s) for $" + res1[0].price * answer2.quantity);
                        displayAll();
                    });
                }
            });
        });
    });
}

displayAll();