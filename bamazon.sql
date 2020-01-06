CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price FLOAT default 0,
  stock INT default 0,
  product_sales INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock) VALUES
("Spiral Notbeook", "Supplies", 3, 15, 500),
("Play Station 4", "Gaming", 300, 15, 13000),
("Ford Mustang GT", "Auto", 50000, 1, 150000),
("Ballpoint Pen", "Supplies", 1, 500), 995,
("UCF Shirt", "Clothing", 12, 5, 480),
("Nike Air Force 1", "Footwear", 120, 10, 3600),
("Elevation Mask", "Training", 50, 20, 2500),
("Weighted Vest", "Training", 25, 5, 725),
("Jordan 1 Bred", "Footwear", 175, 10, 12500),
("Jansport Backpack", "Supplies", 60, 10, 5000);

CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(45) NOT NULL,
    over_head_cost FLOAT default 0,
    PRIMARY KEY (department_id)
)

INSERT INTO departments (department_name, over_head_cost) VALUES
("Supplies", 1000),
("Footwear", 15000),
("Training", 3000),
("Gaming", 9000),
("Auto", 100000),
("Clothing", 2500);