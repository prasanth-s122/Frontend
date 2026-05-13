CREATE DATABASE employee_dml;
USE employee_dml;
-- TASK 1
CREATE TABLE employee_details(

	employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_name VARCHAR(30) NOT NULL,
    employee_email VARCHAR(30) NOT NULL UNIQUE,
    department VARCHAR(30) NOT NULL,
    salary INT

);

SET SQL_SAFE_UPDATES = 0;

-- TASK2

INSERT INTO employee_details (employee_name,employee_email,department,salary) VALUES ("Loki","loki@gmail.com","IT",1000000);

-- TASK 3
INSERT INTO employee_details (employee_name, employee_email, department, salary) VALUES
('Arun Kumar', 'arun.kumar@gmail.com', 'HR', 35000),
('Priya Sharma', 'priya.sharma@gmail.com', 'Finance', 42000),
('Vignesh R', 'vignesh.r@gmail.com', 'IT', 50000),
('Sneha Patel', 'sneha.patel@gmail.com', 'Marketing', 38000),
('Rahul Verma', 'rahul.verma@gmail.com', 'Sales', 45000);

-- TASK 4
UPDATE employee_details SET salary = 60000 WHERE employee_id=2;

-- TASK 5
UPDATE employee_details SET department = "Software engineer" WHERE department="IT";

-- TASK 6
UPDATE employee_details SET salary = salary+5000 WHERE department = "Marketing";