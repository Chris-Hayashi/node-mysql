var mysql = require("mysql");

var inquirer = require("inquirer");

var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "Localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
})

var table = new Table({
    head: ["ID", "Product", "Price", "Quantity"]
});


function displayOptions() {
    inquirer.prompt({
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }).then(function(answer) {
        switch (answer.options) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewInventory()
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
        }
    });
}

function viewProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
            );
        }

        console.log(table.toString());
    });
}

function viewInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(query, function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
            );
        }

        console.log(table.toString());
    });
}

function addInventory() {
    var productList = [];
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            productList.push(res[i].product_name);
        }
        inquirer.prompt([{
            type: "list",
            name: "product",
            message: "What product would you like to add to inventory?",
            choices: productList
        }, {
            type: "input",
            name: "quantity",
            message: "How many would you like to add?"
        }])
        .then(function(answers) {
            var query = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_name = ?";
            connection.query(query, [answers.quantity, answers.product], function(err, res) {
                if (err) throw err;
                console.log("Inventory succesfully updated...");
            });
        })
    });
}

function addProduct() {
    
    inquirer.prompt([{
        type: "input",
        name: "productName",
        message: "What is the name of the product you would like to add?"
    }, {
        type: "input",
        name: "department",
        message: "Which department does this product fall into?"
    }, {
        type: "input",
        name: "price",
        message: "How much does it cost?"
    }, {
        type: "input",
        name: "quantity",
        message: "How many do we have?"
    }])
    .then(function(answers) {
        var query = "INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)";
        connection.query(query, [answers.productName, answers.department, answers.price, answers.quantity], function(err, res) {
            if (err) throw err;
            console.log("Product successfully added...");
        });
    });
}

displayOptions();