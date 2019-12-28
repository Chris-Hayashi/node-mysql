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
});