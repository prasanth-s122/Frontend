CREATE DATABASE company_management;
USE company_management;

-- =========================
-- TASK 1 : STUDENTS & COURSES
-- =========================

CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(50)
);

CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(50),
    course_id INT,

    FOREIGN KEY (course_id)
    REFERENCES courses(course_id)
);

-- Insert Courses
INSERT INTO courses (course_name)
VALUES
('Java'),
('Python'),
('SQL'),
('React');

-- Insert Students
INSERT INTO students (student_name, course_id)
VALUES
('Arun', 1),
('Priya', 2),
('Kavin', 3),
('Meena', NULL),
('Rahul', NULL);

-- INNER JOIN
-- Show student name and course name

SELECT students.student_name, courses.course_name
FROM students
INNER JOIN courses
ON students.course_id = courses.course_id;

-- =========================
-- TASK 2 : LEFT JOIN
-- =========================

-- Show all students with their course names

SELECT students.student_name, courses.course_name
FROM students
LEFT JOIN courses
ON students.course_id = courses.course_id;

-- =========================
-- TASK 3 : RIGHT JOIN
-- =========================

-- Show all courses with matching students

SELECT students.student_name, courses.course_name
FROM students
RIGHT JOIN courses
ON students.course_id = courses.course_id;

-- =========================
-- TASK 4 : EMPLOYEES & DEPARTMENTS
-- =========================

CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(50)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_name VARCHAR(50),
    department_id INT,

    FOREIGN KEY (department_id)
    REFERENCES departments(department_id)
);

-- Insert Departments
INSERT INTO departments (department_name)
VALUES
('HR'),
('Developer'),
('Testing'),
('Support');

-- Insert Employees
INSERT INTO employees (employee_name, department_id)
VALUES
('Vijay', 1),
('Anitha', 2),
('Suresh', 2),
('Kumar', NULL);

-- INNER JOIN
-- Show employee name and department name

SELECT employees.employee_name, departments.department_name
FROM employees
INNER JOIN departments
ON employees.department_id = departments.department_id;

-- =========================
-- TASK 5 : LEFT JOIN WITH IFNULL
-- =========================

-- Show employees without department

SELECT 
    employees.employee_name,
    IFNULL(departments.department_name, 'No Department') AS department_name
FROM employees
LEFT JOIN departments
ON employees.department_id = departments.department_id;