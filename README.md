# node-mysql

<h2>The Assignment: <h2>
To design an Amazon-like storefront using MySQL. The app will take in orders from customers and deplete stock from the store's inventory. Additionally, the app will track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store. There are 3 levels of interacting with this application: bamazonCustomer.js, bamazonManger.js, and bamazonSupervisor.js

<h2>How it works: <h2>
This app requires three npm packages, 'mysql', 'inquirer', and 'cli-table'(which will be used to display output). This application uses a MySQL database called bamazon that contains two tables, named 'products' and 'departments.' In each level of the application, a list of questions will be displayed using the npm package 'inquirer.' Depending on the user's input, the app will interact with the MySQL database in a variety of ways, including retrieving data from and inserting into one of the two tables. 

<h2> Demo: <h2>
