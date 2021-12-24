// за основу взята дипломная работа (хренового качества, но что есть, то есть; здесь ещё почему-то лёг код с sql, так что пришлось пока закомментить)

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
//const sql = require("mssql/msnodesqlv8");

const port = 3000;

const _AUTHENTICATE_ = "$AUTHENTICATE$";
const _IS_USER_ = "$IS_USER$";
const _SMTH_BAD_ = "$SMTH_BAD$";
const _BAD_TOKEN_ = "$BAD_TOKEN$";
const _FINE_ = "$FINE$";

const registrationPage = "/auth/registration.html";
const page401 = "/auth/authorize.html";

const page404 = "/status-pages/404.html";
const page500 = "/status-pages/500.html";

const homePage = "/index.html";

const homePagePartial = "/homepage.partx";
const chatRoom = "/chat.partx";
const aboutPage = "/about.partx";
const botPage = "/bot.partx";
const dataSqlPage = "/info.partx";
const dataSqlPageItem = "/info-item.partx";

const gamePage = "/Game/rules.html";
const gameRegistrationPage = "/Game/registration.html";
const gameRecordsPage = "/Game/records.html";
const gameStartPage = "/Game/game.html";

const emoticonsFolder = "Emoticons/";

const chatLink = /^!link\s.+$/;
const linkPart = /^!link\s/;
const protocol = /^!link\shttp:\/\//;
const protocolSafe = /^!link\shttps:\/\//;

const protocolString = "http://";

const tokenLife = 18000;

let usersOnline = 0;

/*const pool = new sql.ConnectionPool({
    database: "FunDatabase",
    server: "LAMIAROID\\SQLEXPRESS",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
    },
});*/

app.use(fileUpload());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {
    usersOnline++;

    console.log("new user connected");
    socket.broadcast.emit("user connected", usersOnline);
    socket.emit("you have connected", usersOnline);

    socket.on("chat message", function (message) {
        let regex = chatLink;

        if (regex.test(message)) {
            if (!protocol.test(message) && !protocolSafe.test(message)) {
                io.emit("chat link", message.replace(linkPart, protocolString));
            } else {
                io.emit("chat link", message.replace(linkPart, ""));
            }
        } else {
            switch (message) {
                case "!rofl":
                    io.emit("chat emoticon", emoticonsFolder + "rofl.png");
                    break;

                case "!haha":
                    io.emit("chat emoticon", emoticonsFolder + "haha.png");
                    break;

                case "!hmm":
                    io.emit("chat emoticon", emoticonsFolder + "hmm.png");
                    break;

                case "!kappa":
                    io.emit("chat emoticon", emoticonsFolder + "kappa.png");
                    break;

                case "!lol":
                    io.emit("chat emoticon", emoticonsFolder + "lol.png");
                    break;

                case "!love":
                    io.emit("chat emoticon", emoticonsFolder + "love.png");
                    break;

                case "!nice":
                    io.emit("chat emoticon", emoticonsFolder + "nice.png");
                    break;

                case "!nooo":
                    io.emit("chat emoticon", emoticonsFolder + "nooo.png");
                    break;

                case "!ok":
                    io.emit("chat emoticon", emoticonsFolder + "ok.png");
                    break;

                case "!omg":
                    io.emit("chat emoticon", emoticonsFolder + "omg.png");
                    break;

                case "!why":
                    io.emit("chat emoticon", emoticonsFolder + "why.png");
                    break;

                case "!stfu":
                    io.emit("chat emoticon", emoticonsFolder + "stfu.png");
                    break;

                case "!dwi":
                    io.emit("chat emoticon", emoticonsFolder + "dwi.png");
                    break;

                case "!alove":
                    io.emit("chat emoticon", emoticonsFolder + "alove.gif");
                    break;

                case "!boom":
                    io.emit("chat emoticon", emoticonsFolder + "boom.gif");
                    break;

                case "!cat":
                    io.emit("chat emoticon", emoticonsFolder + "cat.gif");
                    break;

                case "!party":
                    io.emit("chat emoticon", emoticonsFolder + "party.gif");
                    break;

                case "!sbob":
                    io.emit("chat emoticon", emoticonsFolder + "sbob.gif");
                    break;

                case "!srsly":
                    io.emit("chat emoticon", emoticonsFolder + "srsly.gif");
                    break;

                case "!squid":
                    io.emit("chat emoticon", emoticonsFolder + "squid.gif");
                    break;

                case "!like":
                    io.emit("chat emoticon", emoticonsFolder + "like.gif");
                    break;

                case "!gj":
                    io.emit("chat emoticon", emoticonsFolder + "gj.gif");
                    break;

                default:
                    io.emit("chat message", message);
                    break;
            }
        }
    });

    socket.on("someone is typing", () => {
        io.emit("someone is typing");
    });

    socket.on("noone is typing", () => {
        io.emit("noone is typing");
    });

    socket.on("disconnect", () => {
        usersOnline--, io.emit("user disconnected", usersOnline);
        console.log("user disconnected");
    });
});

app.get("/socket.io-file-client.js", (request, response, next) => {
    let newDir = __dirname;
    newDir = newDir.replace(/\\app/, "");
    newDir += "/node_modules/socket.io-file-client/socket.io-file-client.js";

    return response.sendFile(newDir);
});

app.get("/", tokenChecker, function (request, response) {
    response.status(200).sendFile(__dirname + homePage);
});

app.post("/homepage", tokenChecker, function (request, response) {
    response.redirect("/");
});

app.post("/homX", tokenChecker, function (request, response) {
    response.status(200).sendFile(__dirname + homePagePartial);
});

app.get("/main", tokenChecker, function (request, response) {
    response.redirect("/");
});

app.post("/main", authChecker, function (request, response) {
    response.status(200).sendFile(__dirname + homePage);
});

app.get("/under-construction", function (request, response) {
    response.status(500).sendFile(__dirname + page500);
});

app.post("/under-construction", function (request, response) {
    response.redirect("/under-construction");
});

app.get("/game/records", tokenChecker, async function (request, response) {
    let newPage;
    let result = await new Promise((resolve, reject) => {
        fs.readFile(__dirname + gameRecordsPage, "utf8", function (err, html) {
            if (err) {
                resolve(_SMTH_BAD_);
                return response.status(500).sendFile(__dirname + page500);
            }

            newPage = html;
            resolve(_FINE_);
        });
    });

    if (result == _SMTH_BAD_) {
        return _SMTH_BAD_;
    }

    let newInfo = getRecords("records-hard", "Hard Mode", response);
    newInfo += getRecords("records-medium", "Medium Mode", response);
    newInfo += getRecords("records-easy", "Easy Mode", response);

    if (response.statusCode != 500) {
        response
            .status(200)
            .send(newPage.replace(new RegExp("{FILL-HERE}"), newInfo));
    }
});

app.post("/game/records", tokenChecker, async function (request, response) {
    let result;
    if (request.body.reco !== undefined) {
        console.log(request.body.reco);

        let regex = /^(.+)#(.+)\+(.+)\+(.+)\+(.+)$/;
        let match = regex.exec(request.body.reco);

        let recordsFile;
        switch (match[5]) {
            case "Easy":
                recordsFile = "records-easy";
                break;

            case "Medium":
                recordsFile = "records-medium";
                break;

            case "Hard":
                recordsFile = "records-hard";
                break;

            default:
                recordsFile = _SMTH_BAD_;
                break;
        }

        let records;
        result = await new Promise((resolve, reject) => {
            fs.readFile(
                __dirname + "/Game/" + recordsFile,
                "utf8",
                function read(err, data) {
                    if (err) {
                        resolve(_SMTH_BAD_);
                        return response
                            .status(500)
                            .sendFile(__dirname + page500);
                    }

                    records = data;
                    resolve(_FINE_);
                }
            );
        });

        if (result == _SMTH_BAD_) {
            return _SMTH_BAD_;
        }

        let recordsRegex =
            /!([^!]+)\$\s:\s\$([^!]+)\$\s:\s\$([^!]+)\$\s:\s\$([^!]+)!/g;
        let recordsMatch;

        let newRecordTable = "";
        let needsRewrite = false;
        let stopHere = false;
        let sameRecordUpdate = false;
        let temp = "";
        let temp2 = "";
        while ((recordsMatch = recordsRegex.exec(records)) !== null) {
            if (
                needsRewrite ||
                parseFloat(recordsMatch[4]) > parseFloat(match[4])
            ) {
                if (!needsRewrite) {
                    needsRewrite = true;
                    if (
                        recordsMatch[1] === match[1] &&
                        recordsMatch[2] === match[2] &&
                        recordsMatch[3] === match[3]
                    ) {
                        sameRecordUpdate = true;
                    }
                    temp = recordsMatch[0];
                    newRecordTable += `!${match[1]}$ : $${match[2]}$ : $${match[3]}$ : $${match[4]}!`;
                } else {
                    if (
                        recordsMatch[1] === match[1] &&
                        recordsMatch[2] === match[2] &&
                        recordsMatch[3] === match[3]
                    ) {
                        newRecordTable += temp;
                        stopHere = true;
                    } else {
                        if (!stopHere) {
                            temp2 = recordsMatch[0];
                            if (sameRecordUpdate) {
                                newRecordTable += temp2;
                            } else {
                                newRecordTable += temp;
                            }
                            temp = temp2;
                        } else {
                            newRecordTable += recordsMatch[0];
                        }
                    }
                }
            } else if (
                parseFloat(recordsMatch[4]) <= parseFloat(match[4]) &&
                recordsMatch[1] === match[1] &&
                recordsMatch[2] === match[2] &&
                recordsMatch[3] === match[3]
            ) {
                break;
            } else {
                newRecordTable += recordsMatch[0];
            }
        }

        if (needsRewrite) {
            result = await new Promise((resolve, reject) => {
                fs.writeFile(
                    __dirname + "/Game/" + recordsFile,
                    newRecordTable,
                    function (err) {
                        if (err) {
                            resolve(_SMTH_BAD_);
                            return response
                                .status(500)
                                .sendFile(__dirname + page500);
                        }

                        resolve(_FINE_);
                    }
                );
            });

            if (result == _SMTH_BAD_) {
                return _SMTH_BAD_;
            }
        }
    }

    let newPage;
    result = await new Promise((resolve, reject) => {
        fs.readFile(__dirname + gameRecordsPage, "utf8", function (err, html) {
            if (err) {
                resolve(_SMTH_BAD_);
                return response.status(500).sendFile(__dirname + page500);
            }

            newPage = html;
            resolve(_FINE_);
        });
    });

    if (result == _SMTH_BAD_) {
        return _SMTH_BAD_;
    }

    let newInfo = getRecords("records-hard", "Hard Mode", response);
    newInfo += getRecords("records-medium", "Medium Mode", response);
    newInfo += getRecords("records-easy", "Easy Mode", response);

    if (response.statusCode != 500) {
        response
            .status(200)
            .send(newPage.replace(new RegExp("{FILL-HERE}"), newInfo));
    }
});

app.get("/registration", isUserAlreadyAuthorized, function (request, response) {
    response.status(401).sendFile(__dirname + registrationPage);
});

app.post(
    "/registration",
    isUserAlreadyAuthorized,
    function (request, response) {
        response.status(401).sendFile(__dirname + registrationPage);
    }
);

app.post(
    "/createAccount",
    checkIfRegistrationDataIsValid,
    function (request, response) {
        response.status(200).sendFile(__dirname + homePage);
    }
);

app.post("/bot", function (request, response) {
    response.status(200).sendFile(__dirname + botPage);
});

app.get("/game", tokenChecker, function (request, response) {
    response.status(200).sendFile(__dirname + gamePage);
});

app.post("/game", function (request, response) {
    response.redirect("/game");
});

app.get("/info", tokenChecker, function (request, response) {
    response.status(200).sendFile(__dirname + dataSqlPage);
});

app.post("/info", function (request, response) {
    response.redirect("/info");
});

app.post("/infoitem", tokenChecker, async function (request, response) {
    let newPage;
    let result = await new Promise((resolve, reject) => {
        fs.readFile(__dirname + dataSqlPageItem, "utf8", function (err, html) {
            if (err) {
                resolve(_SMTH_BAD_);
                return response.status(500).sendFile(__dirname + page500);
            }

            newPage = html;
            resolve(_FINE_);
        });
    });

    let sqlQuery;
    switch (request.body.tableName) {
        case "Страны":
            sqlQuery = "SELECT * FROM infoData.Countries";
            break;

        case "Достопримечательности":
            sqlQuery = "SELECT * FROM infoData.Sights";
            break;

        case "Организации":
            sqlQuery = "SELECT * FROM infoData.Organizations";
            break;

        case "Сайты":
            sqlQuery = "SELECT * FROM infoData.Sites";
            break;

        case "Стримеры":
            sqlQuery = "SELECT * FROM infoData.Streamers";
            break;

        case "Бренды":
            sqlQuery = "SELECT * FROM infoData.Brands";
            break;

        case "Крупные города":
            sqlQuery = "SELECT * FROM infoData.Cities";
            break;

        case "Языки":
            sqlQuery = "SELECT * FROM infoData.Languages";
            break;

        case "Религии":
            sqlQuery = "SELECT * FROM infoData.Religion";
            break;

        case "Праздники":
            sqlQuery = "SELECT * FROM infoData.Holidays";
            break;

        case "Группы":
            sqlQuery = "SELECT * FROM infoData.Bands";
            break;

        case "Артисты":
            sqlQuery = "SELECT * FROM infoData.Artists";
            break;

        case "Игры":
            sqlQuery = "SELECT * FROM infoData.Games";
            break;

        case "Экономика":
            sqlQuery = "SELECT * FROM infoData.Economics";
            break;

        case "Интересные факты":
            sqlQuery = "SELECT * FROM infoData.Facts";
            break;

        case "Кино":
            sqlQuery = "SELECT * FROM infoData.Cinema";
            break;

        case "Музыка":
            sqlQuery = "SELECT * FROM infoData.Music";
            break;

        case "Деньги":
            sqlQuery = "SELECT * FROM infoData.Money";
            break;

        case "Легенды":
            sqlQuery = "SELECT * FROM infoData.Legends";
            break;

        case "Киберспорт":
            sqlQuery = "SELECT * FROM infoData.Cybersport";
            break;
    }

    let sqlData;
    /* try {
        let connect = await pool.connect();
        sqlData = await connect.request().query(sqlQuery);
        let close = await connect.close();
    } catch (err) {}*/

    let dataTable =
        '<table cellspacing="0" border="1" cellpadding="5" width="100%" class="table-info">';
    if (sqlData != undefined) {
        switch (request.body.tableName) {
            case "Страны":
                dataTable += "<tr>";
                dataTable += "<th>Название</th>";
                dataTable += "<th>Столица</th>";
                dataTable += "<th>Площадь (кв. км)</th>";
                dataTable += "<th>Население</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].Capital + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].SquareSize + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].PeopleCount + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Достопримечательности":
                dataTable += "<tr>";
                dataTable += "<th>Название</th>";
                dataTable += "<th>Описание</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].Description + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Организации":
                dataTable += "<tr>";
                dataTable += "<th>Название</th>";
                dataTable += "<th>Дата создания</th>";
                dataTable += "<th>Направление</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].CreationDate + "</td>";
                    dataTable +=
                        "<td>" +
                        sqlData.recordset[i].MainWorkingDirection +
                        "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Сайты":
                dataTable += "<tr>";
                dataTable += "<th>Название</th>";
                dataTable += "<th>Дата создания</th>";
                dataTable += "<th>Категория</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].CreationDate + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].Category + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Стримеры":
                dataTable += "<tr>";
                dataTable += "<th>Имя</th>";
                dataTable += "<th>Тип контента</th>";
                dataTable += "<th>День Рождения</th>";
                dataTable += "<th>Пол</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].ContentType + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].BirthDate + "</td>";
                    dataTable += "<td>" + sqlData.recordset[i].Gender + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Бренды":
                dataTable += "<tr>";
                dataTable += "<th>Название</th>";
                dataTable += "<th>Дата создания</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].CreationDate + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Крупные города":
                dataTable += "<tr>";
                dataTable += "<th>Название</th>";
                dataTable += "<th>Столица</th>";
                dataTable += "<th>Население</th>";
                dataTable += "<th>Чем знаменит</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].IsCapital + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].PeopleCount + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].FamousFor + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Языки":
                dataTable += "<tr>";
                dataTable += "<th>Название</th>";
                dataTable += "<th>Разговаривает людей</th>";
                dataTable += "<th>Сложность</th>";
                dataTable += "<th>Количество букв (слогов)</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].PeopleSpeaking + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].Difficulty + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].Letters + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Религии":
                dataTable += "<tr>";
                dataTable += "<th>Название</th>";
                dataTable += "<th>Позиция в мире</th>";
                dataTable += "<th>Дата основания</th>";
                dataTable += "<th>Число последователей</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" +
                        sqlData.recordset[i].WorldNumberPosition +
                        "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].FoundationDate + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].PeopleCount + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Праздники":
                dataTable += "<tr>";
                dataTable += "<th>Название</th>";
                dataTable += "<th>Дата создания</th>";
                dataTable += "<th>Описание</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].FoundationDate + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].Description + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Группы":
                dataTable += "<tr>";
                dataTable += "<th>Название</th>";
                dataTable += "<th>Дата основания</th>";
                dataTable += "<th>Тип</th>";
                dataTable += "<th>Количество участников</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].FoundationDate + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].BandType + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].PeopleInBand + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Артисты":
                dataTable += "<tr>";
                dataTable += "<th>Имя</th>";
                dataTable += "<th>День рождения</th>";
                dataTable += "<th>Пол</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].BirthDate + "</td>";
                    dataTable += "<td>" + sqlData.recordset[i].Gender + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Игры":
                dataTable += "<tr>";
                dataTable += "<th>Название</th>";
                dataTable += "<th>Дата создания</th>";
                dataTable += "<th>Описание</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].CreationDate + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].Description + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Экономика":
                dataTable += "<tr>";
                dataTable += "<th>Страна</th>";
                dataTable += "<th>ВВП</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].CountryName + "</td>";
                    dataTable += "<td>" + sqlData.recordset[i].VVP + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Интересные факты":
                dataTable += "<tr>";
                dataTable += "<th>Факт (эксперимент)</th>";
                dataTable += "<th>Описание</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].FactName + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].FactDescription + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Кино":
                dataTable += "<tr>";
                dataTable += "<th>Название</th>";
                dataTable += "<th>Дата создания</th>";
                dataTable += "<th>Тип</th>";
                dataTable += "<th>Описание</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].CreationDate + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].CinemaType + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].Description + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Музыка":
                dataTable += "<tr>";
                dataTable += "<th>Название трека</th>";
                dataTable += "<th>Стиль</th>";
                dataTable += "<th>Исполнитель</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].Direction + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].BandName + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Деньги":
                dataTable += "<tr>";
                dataTable += "<th>Название</th>";
                dataTable += "<th>Тип</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Name + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].MoneyType + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Легенды":
                dataTable += "<tr>";
                dataTable += "<th>Легенда</th>";
                dataTable += "<th>Основано на реальных событиях</th>";
                dataTable += "<th>Описание</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].LegendName + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].OnRealEvents + "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].Description + "</td>";
                    dataTable += "</tr>";
                }
                break;

            case "Киберспорт":
                dataTable += "<tr>";
                dataTable += "<th>Дисциплина</th>";
                dataTable += "<th>Есть мировые турниры</th>";
                dataTable += "<th>Среднее количество зрителей</th>";
                dataTable += "<th>Известные команды</th>";
                dataTable += "</tr>";
                for (let i = 0; i < sqlData.recordset.length; i++) {
                    dataTable += "<tr>";
                    dataTable += "<td>" + sqlData.recordset[i].Game + "</td>";
                    dataTable +=
                        "<td>" +
                        sqlData.recordset[i].HasBigChampionships +
                        "</td>";
                    dataTable +=
                        "<td>" +
                        sqlData.recordset[i].AverageNumberOfViewers +
                        "</td>";
                    dataTable +=
                        "<td>" + sqlData.recordset[i].FamousTeams + "</td>";
                    dataTable += "</tr>";
                }
                break;
        }
    } else {
        response.status(500);
    }
    dataTable += "</table>";

    if (response.statusCode != 500) {
        response
            .status(200)
            .send(newPage.replace(new RegExp("{DATA-SQL}"), dataTable));
    } else {
        response.status(500).sendFile(__dirname + page500);
    }
});

// Stupid idea
app.get("/game/start", tokenChecker, function (request, response) {
    if (request.url.match(new RegExp(`\\?FirstName=`)) != null) {
        response.status(200).sendFile(__dirname + gameStartPage);
    } else {
        response.status(404).sendFile(__dirname + page404);
    }
});

app.get("/game/registration", tokenChecker, function (request, response) {
    response.status(200).sendFile(__dirname + gameRegistrationPage);
});

app.post("/game/registration", tokenChecker, function (request, response) {
    response.redirect("/game/registration");
});

app.post("/chatroom", tokenChecker, function (request, response) {
    response.status(200).sendFile(__dirname + chatRoom);
});

app.post("/about", tokenChecker, function (request, response) {
    response.status(200).sendFile(__dirname + aboutPage);
});

app.post("/logout", function (request, response) {
    response.cookie("token", request.cookies.token);
    response.clearCookie("token");
    response.redirect("/auth");
});

app.get("/auth", isUserAlreadyAuthorized, function (request, response) {
    response.status(401).sendFile(__dirname + page401);
});

app.post("/auth", isUserAlreadyAuthorized, function (request, response) {
    response.status(401).sendFile(__dirname + page401);
});

app.get("*", function (request, response) {
    response.status(404).sendFile(__dirname + page404);
});

app.post("*", function (request, response) {
    response.status(404).sendFile(__dirname + page404);
});

async function isUserAlreadyAuthorized(request, response, next) {
    let decision = await new Promise(async (resolve, reject) => {
        let tokenState = await isTokenValid(
            request,
            response,
            request.cookies.token
        );
        if (tokenState == _FINE_) {
            resolve(_IS_USER_);
        } else if (tokenState == _BAD_TOKEN_) {
            resolve(_AUTHENTICATE_);
        } else {
            resolve(_SMTH_BAD_);
        }
    });

    if (decision == _IS_USER_) {
        response.redirect("/");
    } else if (decision == _AUTHENTICATE_) {
        next();
    }
}

async function tokenChecker(request, response, next) {
    next();
    /* let decision = await new Promise(async (resolve, reject) => {
        let tokenState = await isTokenValid(
            request,
            response,
            request.cookies.token
        );
        if (tokenState == _FINE_) {
            resolve(_IS_USER_);
        } else if (tokenState == _BAD_TOKEN_) {
            resolve(_AUTHENTICATE_);
        } else {
            resolve(_SMTH_BAD_);
        }
    });

    if (decision == _IS_USER_) {
        next();
    } else if (decision == _AUTHENTICATE_) {
        response.redirect("/auth");
    }*/
}

async function authChecker(request, response, next) {
    let result;

    let sqlQuery = "SELECT * FROM infoData.UserInfo";
    let sqlData;
    let connect;
    let close;
    /*try {
        connect = await pool.connect();
        sqlData = await connect.request().query(sqlQuery);
        close = await connect.close();
    } catch (err) {
        result = _SMTH_BAD_;
    }*/

    if (result == _SMTH_BAD_) {
        return _SMTH_BAD_;
    }

    if (sqlData != undefined) {
        let cypheredLogin = await cypherData(request.body.login);
        let cypheredPassword = await cypherData(request.body.password);

        let regex = new RegExp(
            "!" + cypheredLogin + "\\$ : \\$" + cypheredPassword + "!"
        );

        let allUsersData = "";
        for (let i = 0; i < sqlData.recordset.length; i++) {
            allUsersData +=
                "!" +
                sqlData.recordset[i].Login +
                "$ : $" +
                sqlData.recordset[i].Password +
                "!";
        }

        if (regex.test(allUsersData)) {
            let secret;
            result = await new Promise((resolve, reject) => {
                fs.readFile(
                    __dirname + "/secret/secret",
                    "utf8",
                    function read(err, secretData) {
                        if (err) {
                            resolve(_SMTH_BAD_);
                            return response
                                .status(500)
                                .sendFile(__dirname + page500);
                        }

                        secret = secretData;
                        resolve(_FINE_);
                    }
                );
            });

            if (result == _SMTH_BAD_) {
                return _SMTH_BAD_;
            }

            let token = jwt.sign(
                {
                    login: request.body.login,
                    password: request.body.password,
                },
                secret,
                { expiresIn: tokenLife }
            );

            response.setHeader("Set-Cookie", `token=${token}; HttpOnly`);

            next();
        } else {
            response.redirect("/auth");
        }
    } else {
        response.status(500).sendFile(__dirname + page500);
    }
}

async function checkIfRegistrationDataIsValid(request, response, next) {
    let result;

    let sqlQuery = "SELECT * FROM infoData.UserInfo";
    let sqlData;
    let connect;
    let close;
    /*try {
        connect = await pool.connect();
        sqlData = await connect.request().query(sqlQuery);
        close = await connect.close();
    } catch (err) {
        result = _SMTH_BAD_;
    }*/

    if (result == _SMTH_BAD_) {
        return _SMTH_BAD_;
    }

    if (request.body.password === request.body.passwordSecondTime) {
        let cypheredLogin = await cypherData(request.body.login);
        let cypheredPassword = await cypherData(request.body.password);

        let regex = new RegExp("!" + cypheredLogin + "\\$ : \\$");

        let allUsersData = "";
        for (let i = 0; i < sqlData.recordset.length; i++) {
            allUsersData +=
                "!" +
                sqlData.recordset[i].Login +
                "$ : $" +
                sqlData.recordset[i].Password +
                "!";
        }

        if (!regex.test(allUsersData)) {
            let secret;
            result = await new Promise((resolve, reject) => {
                fs.readFile(
                    __dirname + "/secret/secret",
                    "utf8",
                    function read(err, secretData) {
                        if (err) {
                            resolve(_SMTH_BAD_);
                            return response
                                .status(500)
                                .sendFile(__dirname + page500);
                        }

                        secret = secretData;
                        resolve(_FINE_);
                    }
                );
            });

            if (result == _SMTH_BAD_) {
                return _SMTH_BAD_;
            }

            let token = jwt.sign(
                {
                    login: cypheredLogin,
                    password: cypheredPassword,
                },
                secret,
                { expiresIn: tokenLife }
            );

            sqlQuery = `INSERT INTO infoData.UserInfo (Login, Password) VALUES (CONVERT(VARBINARY, '${cypheredLogin}'), CONVERT(VARBINARY, '${cypheredPassword}'))`;
            sqlData;
            /*  try {
                connect = await pool.connect();
                sqlData = await connect.request().query(sqlQuery);
                close = await connect.close();
            } catch (err) {
                console.log(err);
                result = _SMTH_BAD_;
            }*/

            if (result == _SMTH_BAD_) {
                return _SMTH_BAD_;
            }

            response.setHeader("Set-Cookie", `token=${token}; HttpOnly`);

            next();
        } else {
            response.status(401).sendFile(__dirname + registrationPage);
        }
    } else {
        response.status(412).sendFile(__dirname + registrationPage);
    }
}

function getRecords(difficulty, tableHeader, response) {
    let records;
    try {
        records = fs.readFileSync(__dirname + "/Game/" + difficulty, "utf8");
    } catch (e) {
        return response.status(500).sendFile(__dirname + page500);
    }

    let recordsRegex =
        /!([^!]+)\$\s:\s\$([^!]+)\$\s:\s\$([^!]+)\$\s:\s\$([^!]+)!/g;
    let recordsMatch;
    let newRecordTable = `<div id="records-container"><div id="records-content"><table border="2" id="table"><caption id="table-name"><h3>${tableHeader}</h3></caption><tr><th>Ник</th><th>Email</th><th>Время</th></tr>`;

    while ((recordsMatch = recordsRegex.exec(records)) !== null) {
        newRecordTable += `<tr><th>${recordsMatch[1]} ${recordsMatch[2]}</th><th>${recordsMatch[3]}</th><th>${recordsMatch[4]}с</th></tr>`;
    }

    newRecordTable += `</table><form action="/game" method="post" enctype="multipart/form-data"><button id="records-button">Назад</button></form></div></div>`;

    return newRecordTable;
}

async function cypherData(data) {
    return await new Promise((resolve, reject) => {
        let cypher = "";
        for (let i = 0; i < data.length; i++) {
            cypher += data[i]; //String.fromCharCode((data.charCodeAt(i) - 100)); encoding problems... bruh
        }
        resolve(cypher);
    });
}

async function isTokenValid(request, response, tokenForCheck) {
    let secret;

    let result = await new Promise((resolve, reject) => {
        fs.readFile(
            __dirname + "/secret/secret",
            "utf8",
            function read(err, secretData) {
                if (err) {
                    resolve(_SMTH_BAD_);
                    return response.status(500).sendFile(__dirname + page500);
                }

                secret = secretData;
                resolve(_FINE_);
            }
        );
    });

    if (result == _SMTH_BAD_) {
        return _SMTH_BAD_;
    }

    return (result = await new Promise((resolve, reject) => {
        jwt.verify(tokenForCheck, secret, function (err, decoded) {
            if (err) {
                return resolve(_BAD_TOKEN_);
            }

            resolve(_FINE_);
        });
    }));
}

server.listen(port);
