CREATE DATABASE normalisation;
USE normalisation;

CREATE TABLE bank_customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE,
    city VARCHAR(50)
);

CREATE TABLE bank_accounts (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    account_type VARCHAR(30),
    balance DECIMAL(10,2),

    FOREIGN KEY (customer_id)
    REFERENCES bank_customers(customer_id)
);

CREATE TABLE bank_transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT,
    transaction_type VARCHAR(20),
    amount DECIMAL(10,2),
    transaction_date DATE,

    FOREIGN KEY (account_id)
    REFERENCES bank_accounts(account_id)
);

CREATE TABLE movies (
    movie_id INT PRIMARY KEY AUTO_INCREMENT,
    movie_name VARCHAR(100) NOT NULL,
    release_year YEAR,
    language VARCHAR(30)
);

CREATE TABLE actors (
    actor_id INT PRIMARY KEY AUTO_INCREMENT,
    actor_name VARCHAR(100) NOT NULL,
    age INT
);

CREATE TABLE movie_cast (
    movie_id INT,
    actor_id INT,
    role_name VARCHAR(50),

    PRIMARY KEY (movie_id, actor_id),

    FOREIGN KEY (movie_id)
    REFERENCES movies(movie_id),

    FOREIGN KEY (actor_id)
    REFERENCES actors(actor_id)
);

CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    movie_id INT,
    reviewer_name VARCHAR(100),
    rating DECIMAL(2,1),
    comments VARCHAR(255),

    FOREIGN KEY (movie_id)
    REFERENCES movies(movie_id)
);