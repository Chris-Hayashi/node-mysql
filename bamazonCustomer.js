var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function(error) {
    if (error)
        throw error;
});

