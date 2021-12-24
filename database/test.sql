SELECT * FROM infoData.Countries;

INSERT INTO infoData.Countries (Name, Capital, SquareSize, PeopleCount) VALUES ('Япония', 'Токио', 377973, 126800000);

UPDATE infoData.Countries 
SET Name = 'США', 
	Capital = 'Вашингтон', 
	SquareSize = 377973,
	PeopleCount = 126800000;

DELETE FROM infoData.Countries WHERE Name = 'США';

SELECT * FROM infoData.History;

INSERT INTO infoData.Artists (CountryID, BandID, Name, BirthDate, Gender) VALUES (3, 1, 'Kendall Francis Schmidt', '2 ноября 1990 г', 'Ыфвфыв');

SELECT * FROM infoData.Artists;

DELETE FROM infoData.Languages WHERE Name = 'Русский';

SELECT * FROM infoData.Languages;