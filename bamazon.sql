CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price FLOAT default 0,
  stock INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock) VALUES
("Spiral Notbeook", "supplies", 3, 150),
("Play Station 4", "gaming", 300, 15),
("Ford Mustanf GT", "auto", 50000, 1),
("Ballpoint Pen", "supplies", 1, 500),
("UCF Shirt", "clothing", 12, 5),
("Nike Air Force 1", "footwear", 120, 10),
("Elevation Mask", "training", 50, 20),
("Weighted Vest", "training", 25, 5),
("Jordan 1 Bred", "footwear", 175, 10),
("Jansport Backpack", "supplies", 60, 10);
