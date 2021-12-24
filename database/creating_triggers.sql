CREATE TRIGGER Countries_Insert
ON infoData.Countries
AFTER INSERT
AS
INSERT INTO infoData.History (ActionDate, ActionType, ActionDescription)
VALUES (GETDATE(), 'Добавление',  'Страна: ' + (SELECT Name FROM INSERTED) + '; Столица: ' + (SELECT Capital FROM INSERTED) + '; Площадь (кв. км): ' + CONVERT(VARCHAR(100), (SELECT SquareSize FROM INSERTED)) + '; Население: ' + CONVERT(VARCHAR(100), (SELECT PeopleCount FROM INSERTED)));

GO

CREATE TRIGGER Countries_Delete
ON infoData.Countries
AFTER DELETE
AS
INSERT INTO infoData.History (ActionDate, ActionType, ActionDescription)
VALUES (GETDATE(), 'Удаление', 'Страна: ' + (SELECT Name FROM DELETED) + '; Столица: ' + (SELECT Capital FROM DELETED) + '; Площадь (кв. км): ' + CONVERT(VARCHAR(100), (SELECT SquareSize FROM DELETED)) + '; Население: ' + CONVERT(VARCHAR(100), (SELECT PeopleCount FROM DELETED)));

GO

CREATE TRIGGER Countries_Update
ON infoData.Countries
AFTER UPDATE
AS
INSERT INTO infoData.History (ActionDate, ActionType, ActionDescription)
VALUES (GETDATE(), 'Изменение: (было)', 'Страна: ' + (SELECT Name FROM DELETED) + '; Столица: ' + (SELECT Capital FROM DELETED) + '; Площадь (кв. км): ' + CONVERT(VARCHAR(100), (SELECT SquareSize FROM DELETED)) + '; Население: ' + CONVERT(VARCHAR(100), (SELECT PeopleCount FROM DELETED)));
INSERT INTO infoData.History (ActionDate, ActionType, ActionDescription)
VALUES (GETDATE(), 'Изменение: (стало)', 'Страна: ' + (SELECT Name FROM INSERTED) + '; Столица: ' + (SELECT Capital FROM INSERTED) + '; Площадь (кв. км): ' + CONVERT(VARCHAR(100), (SELECT SquareSize FROM INSERTED)) + '; Население: ' + CONVERT(VARCHAR(100), (SELECT PeopleCount FROM INSERTED)));
GO

CREATE TRIGGER Artists_Gender
ON infoData.Artists
INSTEAD OF INSERT
AS
	if ((SELECT Gender FROM INSERTED) != 'Mужской' AND (SELECT Gender FROM INSERTED) != 'Женский')
		INSERT INTO infoData.Artists (CountryID, BandID, Name, BirthDate, Gender) VALUES ((SELECT CountryID FROM INSERTED), (SELECT BandID FROM INSERTED), (SELECT Name FROM INSERTED), (SELECT BirthDate FROM INSERTED), '-')
	else
		INSERT INTO infoData.Artists (CountryID, BandID, Name, BirthDate, Gender) VALUES ((SELECT CountryID FROM INSERTED), (SELECT BandID FROM INSERTED), (SELECT Name FROM INSERTED), (SELECT BirthDate FROM INSERTED), (SELECT Gender FROM INSERTED))

GO

CREATE TRIGGER Languages_Delete
ON infoData.Languages
INSTEAD OF DELETE
AS
UPDATE infoData.Languages
SET PeopleSpeaking = 0
WHERE Name = (SELECT Name FROM DELETED) 

GO