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
    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "What is the ID of the item you would like to purchase? [Quit with Q]"
    }, {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Quit with Q]"
    }]).then(function(answers) {
        connection.query("SELECT * FROM products where item_id = ?", answers.id, function(err, res1) {
            if (err) throw err;

            if (answers.quantity > res1[0].stock_quantity)
                console.log("Insufficient quantity!");
            else {
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [res1[0].stock_quantity - answers.quantity, answers.id], function(err, res2) {
                    if (err) throw err;
                    // console.log(res2);

                    console.log("You spent $" + res1[0].price * answers.quantity);
                });
            }
        })
    });
}

displayAll();