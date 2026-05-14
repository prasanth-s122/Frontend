CREATE DATABASE college_db;
USE college_db;
CREATE TABLE students(
	
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(30) NOT NULL,
    student_EMAIL VARCHAR(30) NOT NULL UNIQUE,
    student_age INT NOT NULL,
    course VARCHAR(30) NOT NULL

);


CREATE TABLE employees(
	
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_name VARCHAR(30) NOT NULL,
    employee_EMAIL VARCHAR(30) NOT NULL UNIQUE,
    employee_age INT NOT NULL,
    department VARCHAR(30) NOT NULL

);