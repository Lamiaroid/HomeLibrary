INSERT INTO infoData.Countries (Name, Capital, SquareSize, PeopleCount) VALUES ('Япония', 'Токио', 377973, 126800000);
INSERT INTO infoData.Countries (Name, Capital, SquareSize, PeopleCount) VALUES ('США', 'Вашигтон',  9834000, 327200000);
INSERT INTO infoData.Countries (Name, Capital, SquareSize, PeopleCount) VALUES ('Россия', 'Москва', 17100000, 144500000);
INSERT INTO infoData.Countries (Name, Capital, SquareSize, PeopleCount) VALUES ('Китай', 'Пекин', 9597000, 1386000000);
INSERT INTO infoData.Countries (Name, Capital, SquareSize, PeopleCount) VALUES ('Австралия', 'Канберра', 7692000, 24600000);

INSERT INTO infoData.Sights (CountryID, Name, Description) VALUES (1, 'Акихабара (秋葉原)', 'Район в центре Токио, знаменитый своими магазинами электроники. Район также называют Акиба в честь местного храма, который раньше находился в Акихабаре. В последние годы район Акихабара завоевал славу средоточия культуры японских отаку (ярых фанатов), и теперь среди магазинов электроники в этом районе находится множество магазинов и заведений, посвященных аниме и манга. По воскресеньям главная улица района Тюо Дори становится пешеходной с 13:00 до 18:00 (до 17:00 в период с октября по март)');
INSERT INTO infoData.Sights (CountryID, Name, Description) VALUES (2, 'Статуя Свободы', 'Колоссальная скульптура в стиле неоклассицизма, расположенная в США на острове Свободы, находящемся в Верхней Нью-Йоркской бухте примерно в 3 километрах к юго-западу от южной оконечности острова Манхэттен');
INSERT INTO infoData.Sights (CountryID, Name, Description) VALUES (1, 'Гора Фудзияма', 'Действующий вулкан, расположенный на острове Хонсю в национальном парке Фудзи-Хаконе-Идзу. На сегодняшний день вулкан почти не действует. Последнее извержение было зафиксировано в 1707—1708 годах. Стоит отметить, что это было одно из самых сильных извержений за все время существования горы Фудзи. Тогда в Эдо (старое название Токио) образовался слой пепла в 15 см.');
INSERT INTO infoData.Sights (CountryID, Name, Description) VALUES (3, 'Московский Кремль', 'Крепость в центре Москвы и древнейшая её часть, главный общественно-политический и историко-художественный комплекс города, официальная резиденция Президента Российской Федерации, была официальной резиденцией Генерального секретаря ЦК КПСС.');

INSERT INTO infoData.Organizations (CountryID, Name, CreationDate, MainWorkingDirection) VALUES (2, 'Apple', '1 апреля 1976 г.', 'Электроника');
INSERT INTO infoData.Organizations (CountryID, Name, CreationDate, MainWorkingDirection) VALUES (1, 'Subaru Corporation', '15 июля 1953 г.', 'Автомобили');
INSERT INTO infoData.Organizations (CountryID, Name, CreationDate, MainWorkingDirection) VALUES (1, 'Secom Ltd.', '23 февраля 2001 г.', 'Реклама');
INSERT INTO infoData.Organizations (CountryID, Name, CreationDate, MainWorkingDirection) VALUES (NULL, 'Croteam', '14 июня 1993 г.', 'Игры');
INSERT INTO infoData.Organizations (CountryID, Name, CreationDate, MainWorkingDirection) VALUES (3, 'Лукойл', '25 ноября 1991 г.', 'Нефть');

INSERT INTO infoData.Sites (CountryID, Name, CreationDate, Category) VALUES (3, 'DTF', '1999 г.', 'Информационный сайт');
INSERT INTO infoData.Sites (CountryID, Name, CreationDate, Category) VALUES (2, 'Twitter', '21 марта 2006 г.', 'Социальная сеть');
INSERT INTO infoData.Sites (CountryID, Name, CreationDate, Category) VALUES (2, 'eBay', '3 сентября 1995 г.', 'Интернет-магазин');
INSERT INTO infoData.Sites (CountryID, Name, CreationDate, Category) VALUES (2, 'Steam', '12 сентября 2003 г.', 'Онлайн-сервис цифрового распространения компьютерных игр и программ');
INSERT INTO infoData.Sites (CountryID, Name, CreationDate, Category) VALUES (1, '2ch.net', '30 мая 1999 г.', 'Текстборд');

INSERT INTO infoData.Streamers (CountryID, Name, ContentType, BirthDate, Gender) VALUES (1, 'Kizuna AI (виртуальный ютубер)', 'Общение со зрителями', '-', 'Женский');
INSERT INTO infoData.Streamers (CountryID, Name, ContentType, BirthDate, Gender) VALUES (3, 'Arthas (Папич)', 'Стримы по DOTA 2', '19 ноября 1990 г.', 'Мужской');
INSERT INTO infoData.Streamers (CountryID, Name, ContentType, BirthDate, Gender) VALUES (2, 'Tyler1', 'Стримы по League Of Legends', '15 июня 1999 г.', 'Мужской');
INSERT INTO infoData.Streamers (CountryID, Name, ContentType, BirthDate, Gender) VALUES (2, 'Yassuo', 'Стримы по League Of Legends', '6 марта 1995 г.', 'Мужской');

INSERT INTO infoData.Brands (CountryID, OrganizationID, Name, CreationDate) VALUES (1, 2, 'Subaru', '15 июля 1953 г.');
INSERT INTO infoData.Brands (CountryID, OrganizationID, Name, CreationDate) VALUES (2, 1, 'Apple', '1 апреля 1976 г.');
INSERT INTO infoData.Brands (CountryID, OrganizationID, Name, CreationDate) VALUES (NULL, NULL, 'Lacoste', '1993');

INSERT INTO infoData.Cities (CountryID, Name, IsCapital, PeopleCount, FamousFor) VALUES (1, 'Киото', 'Нет', 1475000, '-');
INSERT INTO infoData.Cities (CountryID, Name, IsCapital, PeopleCount, FamousFor) VALUES (1, 'Осака', 'Нет',  2628811, 'Замок в Осаке');
INSERT INTO infoData.Cities (CountryID, Name, IsCapital, PeopleCount, FamousFor) VALUES (1, 'Токио', 'Да', 9273000, 'Акихабара');
INSERT INTO infoData.Cities (CountryID, Name, IsCapital, PeopleCount, FamousFor) VALUES (2, 'Нью-Йорк', 'Нет', 8623000, 'Статуя Свободы');
INSERT INTO infoData.Cities (CountryID, Name, IsCapital, PeopleCount, FamousFor) VALUES (3, 'Санкт-Петербург', 'Нет', 4991000, 'Эрмитаж');

INSERT INTO infoData.Languages (Name, PeopleSpeaking, Difficulty, Letters) VALUES ('Японский', 140000000, 'Сложный', 46);
INSERT INTO infoData.Languages (Name, PeopleSpeaking, Difficulty, Letters) VALUES ('Китайский', 1300000000, 'Очень сложный', 400);
INSERT INTO infoData.Languages (Name, PeopleSpeaking, Difficulty, Letters) VALUES ('Английский', 753359540, 'Простой', 26);
INSERT INTO infoData.Languages (Name, PeopleSpeaking, Difficulty, Letters) VALUES ('Русский', 300000000, 'Сложный', 33);

INSERT INTO infoData.Religion (Name, WorldNumberPosition, FoundationDate, PeopleCount) VALUES ('Ислам', 2, '610 год н. э.', '1600000000');
INSERT INTO infoData.Religion (Name, WorldNumberPosition, FoundationDate, PeopleCount) VALUES ('Христиантсво', 1, '33 год н. э.', '2200000000');
INSERT INTO infoData.Religion (Name, WorldNumberPosition, FoundationDate, PeopleCount) VALUES ('Буддизм', 4, 'Середина I тысячелетия до н. э.', '500000000');

INSERT INTO infoData.Holidays (CountryID, Name, FoundationDate, Description) VALUES (1, 'Сэцубун ', '-', 'Японский Старый Новый Год.');
INSERT INTO infoData.Holidays (CountryID, Name, FoundationDate, Description) VALUES (NULL, 'Пасха', 'I век н. э.', 'Установлен в честь Воскресения Иисуса Христа, которое является центром всей библейской истории и основой всего христианского учения.');
INSERT INTO infoData.Holidays (CountryID, Name, FoundationDate, Description) VALUES (NULL, 'Новый Год', '-', 'главный календарный праздник, наступающий в момент перехода с последнего дня года в первый день следующего года. Отмечается многими народами в соответствии с принятым календарём.');

INSERT INTO infoData.Bands (CountryID, Name, FoundationDate, BandType, PeopleInBand) VALUES (3, 'IOWA', '2009 г.', 'Музыкальная группа', 7);
INSERT INTO infoData.Bands (CountryID, Name, FoundationDate, BandType, PeopleInBand) VALUES (NULL, 'Rammstein', '1994 г.', 'Музыкальная группа', 6);
INSERT INTO infoData.Bands (CountryID, Name, FoundationDate, BandType, PeopleInBand) VALUES (2, 'Big Time Rush', '2009 г.', 'Музыкальная группа', 4);

INSERT INTO infoData.Artists (CountryID, BandID, Name, BirthDate, Gender) VALUES (2, 3, 'Kendall Francis Schmidt', '2 ноября 1990 г', 'Мужской');
INSERT INTO infoData.Artists (CountryID, BandID, Name, BirthDate, Gender) VALUES (3, NULL, 'Филипп Бедросович Киркоров', '30 апреля 1967 г.', 'Мужской');
INSERT INTO infoData.Artists (CountryID, BandID, Name, BirthDate, Gender) VALUES (2, NULL, 'Angelina Jolie', '4 июня 1975 г.', 'Женский');
INSERT INTO infoData.Artists (CountryID, BandID, Name, BirthDate, Gender) VALUES (1, NULL, 'Харука Аясэ', '24 марта 1985 г.', 'Женский');
INSERT INTO infoData.Artists (CountryID, BandID, Name, BirthDate, Gender) VALUES (3, 1, 'Екатерина Леонидовна Иванчикова', '18 августа 1987 г.', 'Женский');

INSERT INTO infoData.Games (CountryID, OrganizationID, Name, CreationDate, Description) VALUES (2, NULL, 'DOOM', '13 мая 2016 года', '«Объединённая аэрокосмическая корпорация», базирующаяся на Марсе, в результате экспериментов по получению энергии открывает портал в Ад. Одна из команд, посланных на его исследование, находит там саркофаг с запечатанным воином и перемещает его на Марс...');
INSERT INTO infoData.Games (CountryID, OrganizationID, Name, CreationDate, Description) VALUES (NULL, 4, 'Serious Sam 3: BFE', '22 ноября 2011', 'В середине XXI века во время раскопок в Древнем Египте человечеством были найдены останки давно исчезнувшей инопланетной цивилизации с планеты Сириус. Обнаруженные находки и технологии послужили мощнейшим толчком к технологическому развитию планеты, позволив человечеству создавать межпланетные корабли и путешествовать к другим звёздам. Быстрый рост и продвижение землян в космосе привлекли внимание Тах-Ума, древнего инопланетного существа, также прозванного Менталом, и его бесчисленных армий, которые атаковали землян...');
INSERT INTO infoData.Games (CountryID, OrganizationID, Name, CreationDate, Description) VALUES (3, NULL, 'Бесконечное Лето', '21 декабря 2013', 'Главный герой игры — одинокий молодой человек Семён. Он живёт за счёт случайных фрилансовых заказов и проводит большую часть своего времени в интернете на анонимных имиджбордах. В один зимний день Семён отправляется на встречу выпускников, садится в автобус марки «ЛиАЗ-677» 410-го маршрута, где засыпает, а просыпается летом в «Икарусе-256» у ворот пионерлагеря «Совёнок»...');
INSERT INTO infoData.Games (CountryID, OrganizationID, Name, CreationDate, Description) VALUES (1, NULL, 'NieR: Automata', '23 февраля 2017', 'Сюжет игры расскажет про вторжение на Землю пришельцев, которые с помощью особого вируса создали механическую форму жизни. Она, в свою очередь, без труда захватила планету с помощью несокрушимой военной мощи, заставив человечество сбежать на Луну. Чтобы вернуть родную планету, люди создали человекоподобных андроидов, которым и было уготовано сражаться с коварным врагом.');

INSERT INTO infoData.Economics (CountryID, CountryName, VVP) VALUES (1, 'Япония', '4872000000000');
INSERT INTO infoData.Economics (CountryID, CountryName, VVP) VALUES (3, 'Россия', '1578000000000');

INSERT INTO infoData.Facts (FactName, FactDescription) VALUES ('Чайник Рассела', 'Парадокс Чайника Рассела заключается в следующем – ученый не обязан доказывать, что чего-то не существует. И наоборот, любое утверждение о существовании предмета или явление должно быть чем-то подкреплено');
INSERT INTO infoData.Facts (FactName, FactDescription) VALUES ('Кот Шрёддингера', 'Кот Шредингера – это эксперимент, проведенный Эрвином Шредингером, одним из отцов-основателей квантовой механики. Причем это не обычный физический эксперимент, а мысленный.');
INSERT INTO infoData.Facts (FactName, FactDescription) VALUES ('Избыток сахара влияет на мозг', 'Исследования на крысах и людях показали, что потребление слишком большого количества сахара влияет на мозг, потенциально нанося вред памяти и вызывая общее старение мозга.');

INSERT INTO infoData.Cinema (CountryID, Name, CinemaType, CreationDate, Description) VALUES (2, 'Аватар', 'Фантастика', 2009, 'Бывший морской пехотинец, прикованный к инвалидному креслу. Несмотря на немощное тело, Джейк в душе по-прежнему остается воином. Он получает задание совершить путешествие в несколько световых лет к базе землян на планете Пандора, где корпорации добывают редкий минерал...');
INSERT INTO infoData.Cinema (CountryID, Name, CinemaType, CreationDate, Description) VALUES (1, 'One Punch Man', 'Аниме', 2015, 'Сайтама кажется совершенно обычным парнем, к тому же лысый и имеющий астеническое худое тело. Но у Сайтамы проблем больше чем у парней, которые похожи на него, ведь в действительности он супергерой! Он постоянно желает встретиться с достойными врагами. Когда Сайтам все-таки находит себе соответствующего врага, то вырубает его с одного удара. Найдет ли себе герой врага, который был бы равным ему?');
INSERT INTO infoData.Cinema (CountryID, Name, CinemaType, CreationDate, Description) VALUES (1, 'Death Note', 'Аниме', 2006, 'Убийство – сложнейшее из поступков, на который может решиться человек. Ведь библейская заповедь намертво вколочена в нас с младых ногтей. Порой, конечно, проскальзывают у некотрых сладкие мысли, вроде того, ка бы хорошо было отомстить подружке, переспавшей с лучшим другом, и вогнать нож в этого названного приятеля, а может, дельце попроще – как подсыпать яд не поставившему зачет профессору или такая малость: как бы твой конкурент случайно вывалился из окна...');
INSERT INTO infoData.Cinema (CountryID, Name, CinemaType, CreationDate, Description) VALUES (3, 'T-34', 'Боевик', 2019, 'Во времена величайших испытаний человечества, когда от каждого действия зависят жизни любимых, два заклятых врага начнут свое противостояние. Оказавшись в плену, вчерашний курсант Ивушкин планирует дерзкий побег. Он собирает свой экипаж и бросает вызов немецким танковым ассам во главе с Ягером.');
INSERT INTO infoData.Cinema (CountryID, Name, CinemaType, CreationDate, Description) VALUES (1, 'Царство', 'Боевик', 2019, 'Китай, период Сражающихся царств. Государства ведут между собой кровопролитные захватнические войны. Где-то на задворках одного из таких царств ежедневно тренируются двое сирот, мечтающих стать великими генералами. Эпические сражения, дворцовые интриги и военные перевороты...');

INSERT INTO infoData.Music (Name, Direction, BandName) VALUES ('Syndicate', 'Dubstep', 'Skrillex');
INSERT INTO infoData.Music (Name, Direction, BandName) VALUES ('Her Blood Into My Veins', 'DarkElectro', 'Alien Vampires');
INSERT INTO infoData.Music (Name, Direction, BandName) VALUES ('Here Comes The Storm', 'DarkElectro', 'Diversant:13');
INSERT INTO infoData.Music (Name, Direction, BandName) VALUES ('Last Chance', 'Dubstep', 'eXselsor');
INSERT INTO infoData.Music (Name, Direction, BandName) VALUES ('Не открывая глаз', 'DarkElectro', 'Техногенетика');

INSERT INTO infoData.Money (CountryID, Name, MoneyType) VALUES (1, 'Йена', 'Бумажный');
INSERT INTO infoData.Money (CountryID, Name, MoneyType) VALUES (2, 'Доллар', 'Бумажный');
INSERT INTO infoData.Money (CountryID, Name, MoneyType) VALUES (NULL, 'Биткоин', 'Электронный');

INSERT INTO infoData.Legends (LegendName, Description, OnRealEvents) VALUES ('Проклятие сожженной заживо', 'В годы правления инквизиции колдуньей могли назвать любую, которая отличалась от остальных. Ужасное и кровожадное было время, погубившее много невинных. Так случилось и с Матильдой. Бедолагу тянули на главную площадь, с ее лица капали капли крови, а тело украшали синяки и раны от побоев. Именно таким способом инквизиция пыталась выбить из нее признание в колдовстве. Вынесение приговора и казнь путём сожжения, но история на этом не заканчивается...', 'Да');
INSERT INTO infoData.Legends (LegendName, Description, OnRealEvents) VALUES ('Женщина с разрезанным ртом', 'Женщина в маске останавливает ребёнка и спрашивает его: «Я красивая?» Если ребёнок отвечает, что нет, она убивает его большими ножницами, которые всегда носит с собой. Если он ответит, что да, женщина снимет маску, показывая рот, перерезанный от уха до уха, с огромными зубами и змеиным языком, и спросит: «А теперь?» Если ребёнок ответит, что нет, то будет обезглавлен. Если же ответит, что да, то она разрежет ему рот так же, как у неё.', 'Частично');
INSERT INTO infoData.Legends (LegendName, Description, OnRealEvents) VALUES ('Крошечный рот', 'Японская городская легенда о женщине, которую прокляли, оставив ей два рта. В Японии её называют Футакучи-онна или “Женщина с двумя ртами”. На затылке у неё, спрятанный под волосами, располагается второй, огромный рот. Череп женщины может распадаться на части, обнажая губы, зубы и язык. Рот на затылке у неё хищный и может потреблять огромное количество пищи.', 'Нет');

INSERT INTO infoData.Cybersport (Game, HasBigChampionships, AverageNumberOfViewers, FamousTeams) VALUES ('League Of Legends', 'Да', 4300000, 'SK Telecom T1');
INSERT INTO infoData.Cybersport (Game, HasBigChampionships, AverageNumberOfViewers, FamousTeams) VALUES ('Counter-Strike: Global Offensive', 'Да', 1970000, 'Team Liquid');
INSERT INTO infoData.Cybersport (Game, HasBigChampionships, AverageNumberOfViewers, FamousTeams) VALUES ('DOTA 2', 'Да', 1900000, 'Team Secret');
INSERT INTO infoData.Cybersport (Game, HasBigChampionships, AverageNumberOfViewers, FamousTeams) VALUES ('Overwatch', 'Нет', 1120000, '-');
INSERT INTO infoData.Cybersport (Game, HasBigChampionships, AverageNumberOfViewers, FamousTeams) VALUES ('Fortnite', 'Нет', 1690068, 'Team Atlantis');

