CREATE  DATABASE ecommerce;
USE ecommerce;

CREATE TABLE customers(

	customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(50),
    city VARCHAR(50)

);

CREATE TABLE orders(

	orders_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(50),
    customer_id INT,
    amount INT,
    
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)

);

INSERT INTO customers (customer_name,city) VALUES ("Seeman","Karaikudi"),("Loki","Asgard"),("Kratos","Midgard"),("Arvind","Guindy"),("Srini","Mogapair");

INSERT INTO orders (product_name,customer_id,amount) VALUES ("Eggs",1,60),("Laptop Stand",5,1000),("Briyani",1,300),("Mobile cooler",4,2000),("Headphones",4,5500),("Keyboard",4,6000),("Mouse",5,2000),("Laptop",5,120000),("Mobile",4,60000);

--

SELECT  customer_name , COUNT(orders_id) AS TOTAL_ORDERS FROM  







