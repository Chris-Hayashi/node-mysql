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

var table = new Table({
    head: ["Department ID", "Department Name", "Overhead Costs", "Product Sales", "Total Profit"]
});

inquirer.prompt({
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: [
        "View Product Sales by Department",
        "Create New Department"
    ]
}).then(function(answers) {
    switch (answers.options) {
        case "View Product Sales by Department":
            viewSales();
            break;
        case "Create New Department":
            createDepartment();
            break;
    }
});


function viewSales() {

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

                if (obj.department_name == res1[res1.length - 1].department_name)
                    console.log(table.toString());
            });
        });
    });
}

function createDepartment() {

}