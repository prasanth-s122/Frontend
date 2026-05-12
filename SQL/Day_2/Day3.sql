CREATE DATABASE election;
use election;

CREATE TABLE constitution (

constitution_id int primary key auto_increment,
district_name varchar(200) not null,
constitution_name varchar(200) not null,
constitution_dis_id varchar(200) not null

);

CREATE TABLE parties (

party_id int primary key auto_increment,
party_symbol varchar(200) not null,
party_name varchar(200) not null,
party_dis_number varchar(200) not null

);


CREATE TABLE candidates (

candidate_id int primary key auto_increment,
candidate_name varchar(200) not null,
candidate_age varchar(200) not null,
candidate_mobile_number varchar(200) not null,
candidate_party_name varchar(200) not null,
candidate_constitution varchar(200) not null


);





-- Insert Data

INSERT INTO constitution (district_name,constitution_name,constitution_dis_id) VALUES ("CHENNAI","VELACHERY","26"),("CHENNAI","VELACHERY","26");

UPDATE constitution SET constitution_name = "Solinganallur",constitution_dis_id="27" where constitution_id = 2;






-- My data

INSERT INTO parties (party_symbol,party_name,party_dis_number) VALUES ("Sun","DMK","200"),("Leaf","AIADMK","11"),("Hand","Congress","5"),("Pot","VCK","10"),("Lotus","BJP","420"); 
INSERT INTO candidates (candidate_name,candidate_age,candidate_mobile_number,candidate_party_name,candidate_constitution) VALUES ("Stalin","71","9876543210","DMK","Kolathur"),("Padapadi Elanisamy","71","9876543211","AIADMK","Salem"),("Udhayanithi","40","9876543212","DMK","Chepauk"),("Thirumavalavan","60","9876543213","VCK","Chidambaram"),("Vanathi","60","9876543214","BJP","Coimbatore"),("Senthil Balaji","40","9876543215","DMK","Coimbatore"),("Seeman","40","9876543216","NTK","Karaikudi"),("Anbil Magesh","55","9876543217","DMK","Trichy"),("Palanivel Thiyagarajan","55","9876543218","DMK","Madurai"),("Chandrasekar","55","9876543220","AIADMK","Senthamangalam");
INSERT INTO constitution (district_name,constitution_name,constitution_dis_id) VALUES ("Chennai","Kolathur","13"),("Chennai","Chepauk","19"),("Salem","Edappadi","86"),("Cuddalore","Chidambaram","158");