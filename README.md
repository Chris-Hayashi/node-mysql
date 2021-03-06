# node-mysql

### The Assignment
To design an Amazon-like storefront using MySQL. The app will take in orders from customers and deplete stock from the store's inventory. Additionally, the app will track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store. There are 3 levels of interacting with this application: bamazonCustomer.js, bamazonManger.js, and bamazonSupervisor.js

### How it works
This app requires three npm packages, 'mysql', 'inquirer', and 'cli-table'(which will be used to display output). This application uses a MySQL database called bamazon that contains two tables, named 'products' and 'departments.' In each level of the application, a list of questions will be displayed using the npm package 'inquirer.' Depending on the user's input, the app will interact with the MySQL database in a variety of ways, including retrieving data from and inserting into one of the two tables. 

### Demo
bamazonCustomer.js:
![customer](images/gifs/customer.gif)

bamazonManager.js:
![manager](images/gifs/manager.gif)

bamazonSupervisor.js:
![supervisor](images/gifs/supervisor.gif)


### Screenshots
bamazonCustomer.js:
![customer1](images/screenshots/customer1.png)
![customer2](images/screenshots/customer2.png)
![customer3](images/screenshots/customer3.png)

bamazonManager.js:
![manager1](images/screenshots/manager1.png)
![manager2](images/screenshots/manager2.png)
![manager3](images/screenshots/manager3.png)
![manager4](images/screenshots/manager4.png)
![manager5](images/screenshots/manager5.png)

bamazonSupervisor.js:
![supervisor1](images/screenshots/supervisor1.png)
![supervisor2](images/screenshots/supervisor2.png)
![supervisor3](images/screenshots/supervisor3.png)

schema.sql:
![schema](images/screenshots/schema.png)