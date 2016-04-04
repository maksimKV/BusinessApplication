IF db_id('BusinessDB') IS NULL 
    CREATE DATABASE BusinessDB

GO

USE BusinessDB;

CREATE TABLE Employees (
	ID int IDENTITY(1,1) PRIMARY KEY,
	Name varchar(255) NOT NULL,
	Position varchar(255) NOT NULL
);

CREATE TABLE Supervisors (
	ID int IDENTITY(1,1) PRIMARY KEY,
	SupervisorID int FOREIGN KEY REFERENCES Employees(ID),
	EmployeeID int FOREIGN KEY REFERENCES Employees(ID)
);

CREATE TABLE Partners (
	ID int IDENTITY(1,1) PRIMARY KEY,
	Name varchar(255) NOT NULL,
	Email varchar(255) NOT NULL,
	Phone varchar(15) NOT NULL
);

CREATE TABLE Connections (
	ID int IDENTITY(1,1) PRIMARY KEY,
	EmployeeID int FOREIGN KEY REFERENCES Employees(ID) ON DELETE CASCADE,
	PartnerID int FOREIGN KEY REFERENCES Partners(ID) ON DELETE CASCADE
);

INSERT INTO Employees (Name, Position) VALUES
( 'David Coverdale', 'Manager' ), ( 'Sharon den Adel', 'Manager' ),
( 'Tommy Aldridge', 'Underwriter' ), ( 'Reb Beach', 'Personal Assistant' ), ( 'Joel Hoekstra', 'Accountant' ),
( 'Robert Westerholt', 'Legal Adviser' ), ( 'Jeroen van Veen', 'System Administrator' ), ( 'Ruud Jolie', 'Designer' );

INSERT INTO Supervisors (SupervisorID, EmployeeID) VALUES
( 1, 3 ), ( 1, 4 ), ( 1, 5 ),
( 2, 6 ), ( 2, 7 ), ( 2, 8 );

INSERT INTO Partners (Name, Email, Phone) VALUES
( 'James Hetfield', 'hetfield@yahoo.com', '+1-202-555-0114' ), ( 'Steve Harris', 'harris@yahoo.com', '+1-202-555-0139' ),
( 'Tarja Turunen', 'turunen@yahoo.com', '+1-202-555-0183' ), ( 'Anette Olzon', 'olzon@yahoo.com', '+1-202-555-0152' ),
( 'Lars Ulrich', 'ulrich@yahoo.com', '+44 1632 960291' ), ( 'Dave Murray', 'murray@yahoo.com', '+44 1632 960512' ), ( 'Emppu Vuorinen', 'vuorinen@yahoo.com', '+44 1632 960918' ),
( 'Kirk Hammett', 'hammet@yahoo.com', '+44 1632 960659' ), ( 'Adrian Smith', 'smith@yahoo.com', '+44 1632 960606' ), ( 'Jukka Nevalainen', 'nevalainen@yahoo.com', '+44 1632 960626' ),
( 'Robert Trujillo', 'trujillo@yahoo.com', '+1-613-555-0194' ), ( 'Bruce Dickinson', 'dickinson@yahoo.com', '+1-613-555-0121' ), ( 'Marco Hietala', 'hietala@yahoo.com', '+1-613-555-0179' ),
( 'Dave Mustaine', 'mustaine@yahoo.com', '+1-613-555-0102' ), ( 'Nicko McBrain', 'mcbrain@yahoo.com', '+1-613-555-0198' ), ( 'Troy Donockley', 'donockley@yahoo.com', '+1-613-555-0164' ),
( 'Janick Gers', 'gers@yahoo.com', '(774) 394-5909' ), ( 'Floor Jansen', 'jansen@yahoo.com', '(869) 532-5796' ), ( 'Thom Gimbel', 'gimbel@yahoo.com', '(219) 595-8649' ),
( 'Jeff Pilson', 'pilson@yahoo.com', '(900) 959-4197' ), ( 'Michael Bluestein', 'bluestein@yahoo.com', '(499) 785-0560' ), ( 'Chris Frazier', 'frazier@yahoo.com', '(516) 143-7253' );

INSERT INTO Connections (EmployeeID, PartnerID) VALUES
(1, 1), (1, 2), (1, 4),
(2, 3), (2, 4), (2, 2),
(3, 5), (3, 6), (3, 7), (3, 12),
(4, 8), (4, 9), (4, 10),
(5, 11), (5, 12), (5, 13), (5, 5), (5, 11), (5, 20),
(6, 14), (6, 15), (6, 16), (6, 9), (6, 19),
(7, 17), (7, 18), (7, 19),
(8, 20), (8, 21), (8, 22), (8, 14);

GO

CREATE TRIGGER EmployeeDeleted
ON Employees
INSTEAD OF DELETE
AS 
BEGIN
	DELETE Supervisors FROM Supervisors, deleted
	WHERE Supervisors.EmployeeID = deleted.ID 
	OR Supervisors.SupervisorID = deleted.ID;

	DELETE Employees FROM Employees, deleted
	WHERE Employees.ID = deleted.ID;
END