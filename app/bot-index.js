const fs = require("fs");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const SocketIOFile = require("socket.io-file");

const port = 4000;

const botGameNumber = 11;
const imagesFolder = "/public/Images/";
const maxFileSize = 1024 * 1024 * 4;

io.on("connection", function (socket) {
    console.log("new user started using bot");

    socket.on("bot", function (message) {
        switch (message) {
            case "help":
                socket.emit(
                    "help",
                    "game - сыграть в игру 'Угадай число' (ask - загадывать; guess - угадывать; yes - если я угадала число); random_image - получить картинку; gift_image - загрузить картинку (send - отправить, когда будешь готов; exit - отказаться от загрузки); firework - запустить фейерверки (nofire - остановить);"
                );
                break;

            case "game":
                socket.emit("game");
                break;

            case "random_image":
                let allImages = fs.readdirSync(__dirname + imagesFolder);
                socket.emit(
                    "random image",
                    allImages[Math.floor(Math.random() * allImages.length)]
                );
                break;

            case "gift_image":
                let uploadButton = `<form enctype="multipart/form-data" id="data-form">
                                        <div class="file-loader">  
                                            <input class="input-file" required id="my-file" type="file" name="file">
                                            <label for="my-file"><img src="Arts/upload.png" class="upload-pic-left"></label>
                                            <label for="my-file" class="input-file-trigger" id="choose-file-label">Выбери картинку...</label> 
                                            <label for="my-file"><img src="Arts/upload.png" class="upload-pic-right"></label>          
                                        </div>
                                    </form>`;
                socket.emit("gift image", uploadButton);
                break;

            case "firework":
                socket.emit("firework");
                break;

            case "nofire":
                socket.emit("nofire");
                break;

            case "change_bot creeper":
                socket.emit("new skin", "creeper");
                break;

            case "change_bot blaze":
                socket.emit("new skin", "blaze");
                break;

            case "change_bot spider":
                socket.emit("new skin", "spider");
                break;

            case "change_bot enderman":
                socket.emit("new skin", "enderman");
                break;

            case "change_bot zombie":
                socket.emit("new skin", "zombie");
                break;

            case "change_bot cave_spider":
                socket.emit("new skin", "cave_spider");
                break;

            case "change_bot skeleton":
                socket.emit("new skin", "skeleton");
                break;

            default:
                socket.emit("unknown");
                break;
        }
    });

    socket.on("answer", function (message) {
        switch (message) {
            case "guess":
                socket.emit(
                    "answer",
                    Math.floor(Math.random() * botGameNumber)
                );
                break;

            case "ask":
                socket.emit("answer", "ask");
                break;

            default:
                socket.emit("unknown");
                break;
        }
    });

    socket.on("game number", function (message) {
        socket.emit("game number", message);
    });

    let uploader = new SocketIOFile(socket, {
        rename: function (filename, fileInfo) {
            let extRegex = /\.[^.]+$/;
            return getFileName(extRegex.exec(fileInfo.name)[0]);
        },
        uploadDir: __dirname + imagesFolder,
        accepts: ["image/png", "image/jpeg"],
        maxFileSize: maxFileSize,
        chunkSize: 10240,
        transmissionDelay: 0,
        overwrite: false,
    });

    uploader.on("start", (fileInfo) => {
        console.log("Start uploading");
    });

    uploader.on("complete", (fileInfo) => {
        console.log("Upload Complete.");
        socket.emit("send", "fine");
    });

    uploader.on("error", (fileInfo) => {
        console.log("Upload error.");
        socket.emit("send", "error");
    });

    socket.on("disconnect", () => {
        console.log("user stopped using bot");
    });
});

function getFileName(fileExtension) {
    const fileNameLength = 40;
    const symbolSet =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
    let fileName = "";

    for (let i = 0; i < fileNameLength; i++) {
        fileName += symbolSet[Math.floor(Math.random() * symbolSet.length)];
    }

    return fileName + fileExtension;
}

server.listen(port);
