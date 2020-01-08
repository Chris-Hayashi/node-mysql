var mysql = require("mysql");

var inquirer = require("inquirer");

var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
});

inquirer.prompt({
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: [
        "View Product Sales by Department",
        "Create New Department",
        "Quit"
    ]
}).then(function(answers) {
    switch (answers.options) {
        case "View Product Sales by Department":
            viewSales();
            break;
        case "Create New Department":
            createDepartment();
            break;
        case "Quit":
            console.log("Goodbye!");
            process.exit();
            break;
    }
});


function viewSales() {

    var table = new Table({
        head: ["Department ID", "Department Name", "Overhead Costs", "Product Sales", "Total Profit"]
    });

    connection.query("SELECT * FROM departments", function(err, res1) {
        if (err) throw err;

        res1.forEach(function(obj) {
            connection.query("SELECT * FROM products WHERE department_name = ?", [obj.department_name], function(err, res2) {
                if (err) throw err;

                var sales = 0;

                for (var i = 0; i<res2.length; i++) {
                    sales += res2[i].product_sales;
                }

                table.push(
                    [obj.department_id, obj.department_name, obj.over_head_costs, sales, sales - obj.over_head_costs]
                );

                if (obj.department_name == res1[res1.length - 1].department_name) {
                    console.log(table.toString());
                    process.exit();
                }
            });
        });
    });
}

function createDepartment() {

    var table = new Table({
        head: ["Department ID", "Department Name", "Overhead Costs"]
    });

    inquirer.prompt([{
        type: "input",
        name: "department_name",
        message: "What is the name of the department?"
    }, {
        type: "input",
        name: "over_head_cost",
        message: "What is the overhead cost of the department?"
    }]).then(function(answers) {

        var query = "INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)";
        connection.query(query, [answers.department_name, answers.over_head_cost], function(err, res) {
            if (err) throw err;
        });

        connection.query("SELECT * FROM departments", function(err, res) {
            if (err) throw err;
            res.forEach(function (obj) {
                table.push(
                    [obj.department_id, obj.department_name, obj.over_head_costs]
                );
            });

            console.log(table.toString());

            process.exit();
        });
    });
}