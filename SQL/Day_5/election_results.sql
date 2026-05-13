CREATE DATABASE election_result;
USE election_result;
CREATE TABLE constituency(
	
    constituency_id INT PRIMARY KEY AUTO_INCREMENT,
    constituency_name VARCHAR(30),
    district_id INT

);

CREATE TABLE district(
	
    district_id INT PRIMARY KEY AUTO_INCREMENT,
    district_name  VARCHAR(30),
    

	FOREIGN KEY (district_id) REFERENCES constituency (district_id)
);

CREATE TABLE parties(

	party_id INT PRIMARY KEY AUTO_INCREMENT,
    party_name  VARCHAR(30)

);

CREATE TABLE candidates(

	candidate_id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_name VARCHAR(30),
    age INT,
    party_id INT 
    

);

