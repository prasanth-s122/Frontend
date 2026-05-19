-- Create Database

CREATE DATABASE college_db1;
USE college_db1;

-- Create Students Table

CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(50),
    course VARCHAR(50),
    marks INT
);

-- Create Log Table

CREATE TABLE student_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(50),
    message VARCHAR(100),
    log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create AFTER INSERT Trigger

DELIMITER $$

CREATE TRIGGER after_student_insert
AFTER INSERT
ON students
FOR EACH ROW
BEGIN

    INSERT INTO student_logs(student_name, message)
    VALUES (
        NEW.student_name,
        'New student inserted'
    );

END $$

DELIMITER ;

-- Insert Record into Students Table

INSERT INTO students(student_name, course, marks)
VALUES
('Arun', 'Java', 85),
('Priya', 'Python', 90);

-- View Students Table

SELECT * FROM students;

-- View Log Table

SELECT * FROM student_logs;