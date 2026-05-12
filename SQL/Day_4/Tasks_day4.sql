CREATE DATABASE ELECTION_TASK;
USE ELECTION_TASK;

CREATE TABLE election_results(

	result_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    candidate_name VARCHAR(30) NOT NULL,
    party_name  VARCHAR(30) NOT NULL,
    district  VARCHAR(30) NOT NULL,
    constituency VARCHAR(30) NOT NULL,
    total_votes INT NOT NULL,
    election_year INT NOT NULL

);

INSERT INTO election_results 
(candidate_name, party_name, district, constituency, total_votes, election_year)
VALUES
('M.K. Stalin', 'DMK', 'Chennai', 'Kolathur', 70384, 2021),
('Udhayanidhi Stalin', 'DMK', 'Chennai', 'Chepauk', 93285, 2021),
('Edappadi K. Palaniswami', 'AIADMK', 'Salem', 'Edappadi', 110786, 2021),
('O. Panneerselvam', 'AIADMK', 'Theni', 'Bodinayakanur', 89064, 2021),
('T.T.V. Dhinakaran', 'AMMK', 'Madurai', 'Kovilpatti', 45632, 2021),
('Kamal Haasan', 'MNM', 'Coimbatore', 'Coimbatore South', 51581, 2021),
('Seeman', 'NTK', 'Chennai', 'Thiruvottiyur', 29844, 2021),
('Anbil Mahesh', 'DMK', 'Tiruchirappalli', 'Lalgudi', 85743, 2021),
('K.N. Nehru', 'DMK', 'Tiruchirappalli', 'Tiruchirappalli West', 91867, 2021),
('Duraimurugan', 'DMK', 'Vellore', 'Katpadi', 85140, 2021),

('R.B. Udhayakumar', 'AIADMK', 'Madurai', 'Tirumangalam', 96742, 2021),
('P. Geetha Jeevan', 'DMK', 'Thoothukudi', 'Thoothukudi', 88123, 2021),
('S.P. Velumani', 'AIADMK', 'Coimbatore', 'Thondamuthur', 124567, 2021),
('Senthil Balaji', 'DMK', 'Karur', 'Karur', 102345, 2021),
('I. Periyasamy', 'DMK', 'Dindigul', 'Athoor', 87654, 2021),
('M.R.K. Panneerselvam', 'DMK', 'Cuddalore', 'Kurinjipadi', 81234, 2021),
('E.V. Velu', 'DMK', 'Tiruvannamalai', 'Tiruvannamalai', 94456, 2021),
('Thangam Thenarasu', 'DMK', 'Virudhunagar', 'Tiruchuli', 92341, 2021),
('K. Ponmudy', 'DMK', 'Villupuram', 'Tirukkoyilur', 80123, 2021),
('Ma Subramanian', 'DMK', 'Chennai', 'Saidapet', 91874, 2021),

('C. Vijayabaskar', 'AIADMK', 'Pudukkottai', 'Viralimalai', 75432, 2021),
('Sellur K. Raju', 'AIADMK', 'Madurai', 'Madurai West', 69874, 2021),
('K.A. Sengottaiyan', 'AIADMK', 'Erode', 'Gobichettipalayam', 112345, 2021),
('P.T.R. Palanivel Thiaga', 'DMK', 'Madurai', 'Madurai Central', 85321, 2021),
('M. Subramanian', 'DMK', 'Chennai', 'Thousand Lights', 87890, 2021),
('J. Karunanidhi', 'DMK', 'Chennai', 'T Nagar', 76432, 2021),
('A. Raja', 'DMK', 'Nilgiris', 'Coonoor', 68975, 2021),
('S. Regupathy', 'DMK', 'Pudukkottai', 'Alangudi', 83214, 2021),
('R. Gandhi', 'DMK', 'Ranipet', 'Ranipet', 79876, 2021),
('V. Senthil Balaji', 'DMK', 'Karur', 'Aravakurichi', 93456, 2021);

SHOW TABLES;
-- TASK 1


SELECT * FROM election_results;

-- TASK 2
SELECT candidate_name,party_name FROM election_results;

-- TASK 3
SELECT candidate_name,total_votes FROM election_results WHERE total_votes > 70000;

-- TASK 4
SELECT candidate_name FROM election_results WHERE district = "Chennai";

-- TASK 5
SELECT candidate_name FROM election_results WHERE party_name = "DMK";

-- TASK 6
SELECT candidate_name,district,total_votes FROM election_results WHERE district = "Madurai" AND total_votes > 60000;

-- TASK 7
SELECT * FROM election_results ORDER BY total_votes ASC;

-- TASK 8
SELECT * FROM election_results ORDER BY total_votes DESC;

-- TASK 9
SELECT * FROM election_results ORDER BY district ASC;

-- TASK 10
SELECT COUNT(*) AS total_candidates FROM election_results;

-- TASK 11
SELECT party_name, SUM(total_votes) AS TOTAL_VOTES FROM election_results GROUP BY party_name;

-- TASK 12
SELECT district, AVG(total_votes) AS AVERAGE_VOTES FROM election_results GROUP BY district;

-- TASK 13 
SELECT party_name, SUM(total_votes) AS TOTAL_VOTES FROM election_results GROUP BY party_name HAVING SUM(total_votes)>100000;

-- TASK 14
SELECT district, MAX(total_votes) AS MAX_VOTE FROM election_results GROUP BY district;

-- TASK 15
SELECT district AS DISTRICT_NAME, AVG(total_votes) AS AVERAGE_MORE_THAN_60000 FROM election_results GROUP BY district HAVING AVG(total_votes)>60000;
