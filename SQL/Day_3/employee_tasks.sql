CREATE DATABASE EMPLOYEE_DETAILS;
USE EMPLOYEE_DETAILS;
CREATE TABLE employees(
	
    employee_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
    employee_name VARCHAR(20) NOT NULL,
    age INT NOT NULL,
    department VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL UNIQUE ,
    salary INT NOT NULL
    

);

ALTER TABLE employees MODIFY email VARCHAR(50) NOT NULL UNIQUE;
SHOW TABLES;

INSERT INTO employees (employee_name, age, department, email, salary) VALUES
('Arun Kumar', 25, 'HR', 'arun.kumar1@gmail.com', 35000),
('Priya Sharma', 28, 'Finance', 'priya.sharma1@gmail.com', 42000),
('Rahul Verma', 30, 'IT', 'rahul.verma1@gmail.com', 55000),
('Sneha Reddy', 26, 'Marketing', 'sneha.reddy1@gmail.com', 40000),
('Vikram Singh', 35, 'Sales', 'vikram.singh1@gmail.com', 48000),
('Anjali Mehta', 29, 'HR', 'anjali.mehta1@gmail.com', 37000),
('Karan Patel', 31, 'IT', 'karan.patel1@gmail.com', 60000),
('Divya Nair', 27, 'Finance', 'divya.nair1@gmail.com', 45000),
('Rohit Das', 33, 'Sales', 'rohit.das1@gmail.com', 50000),
('Meena Iyer', 24, 'Marketing', 'meena.iyer1@gmail.com', 39000),
('Suresh Babu', 36, 'IT', 'suresh.babu1@gmail.com', 65000),
('Pooja Gupta', 28, 'Finance', 'pooja.gupta1@gmail.com', 43000),
('Ajay Kumar', 32, 'HR', 'ajay.kumar1@gmail.com', 38000),
('Neha Joshi', 27, 'Marketing', 'neha.joshi1@gmail.com', 41000),
('Manoj Rao', 34, 'Sales', 'manoj.rao1@gmail.com', 52000),
('Kavya Menon', 25, 'IT', 'kavya.menon1@gmail.com', 57000),
('Deepak Yadav', 29, 'Finance', 'deepak.yadav1@gmail.com', 44000),
('Lakshmi Devi', 31, 'HR', 'lakshmi.devi1@gmail.com', 36000),
('Harish Kumar', 37, 'Sales', 'harish.kumar1@gmail.com', 54000),
('Asha Rani', 26, 'Marketing', 'asha.rani1@gmail.com', 39500),
('Naveen Raj', 30, 'IT', 'naveen.raj1@gmail.com', 61000),
('Bhavana Shetty', 28, 'Finance', 'bhavana.shetty1@gmail.com', 46000),
('Gokul Krishna', 35, 'HR', 'gokul.krishna1@gmail.com', 39000),
('Swathi Pillai', 27, 'Marketing', 'swathi.pillai1@gmail.com', 40500),
('Ramesh Naidu', 38, 'Sales', 'ramesh.naidu1@gmail.com', 56000),
('Keerthana Ravi', 24, 'IT', 'keerthana.ravi1@gmail.com', 58000),
('Vignesh Waran', 29, 'Finance', 'vignesh.waran1@gmail.com', 47000),
('Nithya Suresh', 32, 'HR', 'nithya.suresh1@gmail.com', 37500),
('Sanjay Mishra', 34, 'Sales', 'sanjay.mishra1@gmail.com', 53000),
('Preethi Anand', 26, 'Marketing', 'preethi.anand1@gmail.com', 41500);

-- TASK 1
SELECT COUNT(*) AS EMPLOYEE_COUNT FROM employees;

-- TASK2
SELECT SUM(salary) AS TOTAL_SALARY FROM employees;

-- TASK 3
SELECT AVG(salary) AS AVERAGE_SALARY FROM employees;

-- TASK 4
SELECT MAX(salary) AS MAXIMUM_SALARY FROM employees;

-- TASK 5
SELECT MIN(salary) AS MINIMUM_SALARY FROM employees;

-- TASK 6
SELECT COUNT(age) AS AGE_ABOVE_25 FROM employees WHERE age>25;

-- TASK 7
SELECT SUM(salary) AS SALARY_IT_DAPARTMENT FROM employees;

-- TASK 8
SELECT AVG(age) AS AVERAGE_age FROM employees;

-- TASK 9
SELECT MAX(age) AS MAXIMUM_AGE FROM employees;

-- TASK 10
SELECT MIN(age) AS MINIMUM_AGE FROM employees;

