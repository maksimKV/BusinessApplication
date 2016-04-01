IF db_id('BusinessDB') IS NULL 
    CREATE DATABASE BusinessDB

GO

USE BusinessDB;

CREATE TABLE Employees (
	ID int IDENTITY(1,1) PRIMARY KEY,
	Name varchar(255) NOT NULL,
	Position varchar(255) NOT NULL,
	Supervisor int FOREIGN KEY REFERENCES Employees(ID)
);

CREATE TABLE Partners (
	ID int IDENTITY(1,1) PRIMARY KEY,
	Name varchar(255) NOT NULL,
	Email varchar(255) NOT NULL,
	Phone varchar(15) NOT NULL,
	PartnerID int FOREIGN KEY REFERENCES Employees(ID)
);

INSERT INTO Employees (Name, Position, Supervisor) VALUES
( 'David Coverdale', 'Manager', null ), ( 'Sharon den Adel', 'Manager', null ),
( 'Tommy Aldridge', 'Underwriter', 1 ), ( 'Reb Beach', 'Personal Assistant', 1 ), ( 'Joel Hoekstra', 'Accountant', 1),
( 'Robert Westerholt', 'Legal Adviser', 2), ( 'Jeroen van Veen', 'System Administrator', 2), ( 'Ruud Jolie', 'Designer', 2);

INSERT INTO Partners (Name, Email, Phone, PartnerID) VALUES
( 'James Hetfield', 'hetfield@yahoo.com', '+1-202-555-0114', 1), ( 'Steve Harris', 'harris@yahoo.com', '+1-202-555-0139', 1),
( 'Tarja Turunen', 'turunen@yahoo.com', '+1-202-555-0183', 2), ( 'Anette Olzon', 'olzon@yahoo.com', '+1-202-555-0152', 2),
( 'Lars Ulrich', 'ulrich@yahoo.com', '+44 1632 960291', 3), ( 'Dave Murray', 'murray@yahoo.com', '+44 1632 960512', 3), ( 'Emppu Vuorinen', 'vuorinen@yahoo.com', '+44 1632 960918', 3),
( 'Kirk Hammett', 'hammet@yahoo.com', '+44 1632 960659', 4), ( 'Adrian Smith', 'smith@yahoo.com', '+44 1632 960606', 4), ( 'Jukka Nevalainen', 'nevalainen@yahoo.com', '+44 1632 960626', 4),
( 'Robert Trujillo', 'trujillo@yahoo.com', '+1-613-555-0194', 5), ( 'Bruce Dickinson', 'dickinson@yahoo.com', '+1-613-555-0121', 5), ( 'Marco Hietala', 'hietala@yahoo.com', '+1-613-555-0179', 5),
( 'Dave Mustaine', 'mustaine@yahoo.com', '+1-613-555-0102', 6), ( 'Nicko McBrain', 'mcbrain@yahoo.com', '+1-613-555-0198', 6), ( 'Troy Donockley', 'donockley@yahoo.com', '+1-613-555-0164', 6),
( 'Janick Gers', 'gers@yahoo.com', '(774) 394-5909', 7), ( 'Floor Jansen', 'jansen@yahoo.com', '(869) 532-5796', 7), ( 'Thom Gimbel', 'gimbel@yahoo.com', '(219) 595-8649', 7),
( 'Jeff Pilson', 'pilson@yahoo.com', '(900) 959-4197', 8), ( 'Michael Bluestein', 'bluestein@yahoo.com', '(499) 785-0560', 8), ( 'Chris Frazier', 'frazier@yahoo.com', '(516) 143-7253', 8);