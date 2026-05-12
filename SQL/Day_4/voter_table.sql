CREATE database TNVOTEDB;
USE TNVOTEDB;

CREATE TABLE Voters(

	voter_id INT PRIMARY KEY auto_increment,
    voter_name VARCHAR(20),
    age INT,
    gender VARCHAR(20),
    district VARCHAR(20),
    constitution VARCHAR(20),
    party_name VARCHAR(20),
    vote_count INT

);
ALTER TABLE Voters
RENAME COLUMN constitution TO constituency;

INSERT INTO Voters
(voter_name, age, gender, district, constituency, party_name, vote_count)
VALUES

('Arun Kumar', 34, 'Male', 'Chennai', 'Kolathur', 'DMK', 124560),
('Priya Devi', 29, 'Female', 'Chennai', 'Velachery', 'BJP', 98230),
('Suresh Babu', 45, 'Male', 'Coimbatore', 'Coimbatore South', 'AIADMK', 113450),
('Kavitha', 38, 'Female', 'Madurai', 'Madurai Central', 'DMK', 105670),
('Manikandan', 41, 'Male', 'Salem', 'Salem West', 'NTK', 76450),

('Deepika', 24, 'Female', 'Tirunelveli', 'Palayamkottai', 'Congress', 85420),
('Vignesh', 31, 'Male', 'Trichy', 'Srirangam', 'DMK', 118920),
('Harini', 27, 'Female', 'Erode', 'Erode East', 'AIADMK', 96780),
('Ramesh', 52, 'Male', 'Thanjavur', 'Thanjavur', 'BJP', 88760),
('Nivetha', 22, 'Female', 'Vellore', 'Katpadi', 'DMK', 110540),

('Karthik', 36, 'Male', 'Dindigul', 'Nilakottai', 'PMK', 69320),
('Aishwarya', 30, 'Female', 'Kanyakumari', 'Nagercoil', 'Congress', 120350),
('Saravanan', 47, 'Male', 'Cuddalore', 'Panruti', 'AIADMK', 91480),
('Meena', 33, 'Female', 'Thoothukudi', 'Thoothukudi', 'DMK', 128640),
('Pradeep', 28, 'Male', 'Namakkal', 'Rasipuram', 'BJP', 73450),

('Lakshmi', 40, 'Female', 'Karur', 'Karur', 'DMK', 101230),
('Gokul', 26, 'Male', 'Virudhunagar', 'Aruppukkottai', 'NTK', 68210),
('Anitha', 35, 'Female', 'Sivagangai', 'Manamadurai', 'Congress', 79240),
('Mohan', 50, 'Male', 'Tiruppur', 'Avinashi', 'AIADMK', 108760),
('Divya', 23, 'Female', 'Ranipet', 'Arcot', 'DMK', 95640);


 SELECT voter_name FROM Voters WHERE gender = "Male";