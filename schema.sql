DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT(100) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(6, 2),
    stock_quantity INT(1000),
    product_sales DECIMAL(8, 2),
    PRIMARY KEY(item_id)
);

CREATE TABLE departments (
    department_id INT(100) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    over_head_costs DECIMAL(8, 2),
    PRIMARY KEY(department_id)
);