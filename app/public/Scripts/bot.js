if (socketBot !== undefined) {
   socketBot.close();
}

if (uploader !== undefined) {
    delete uploader;
}

var socketBot = io("http://localhost:4000");
var uploader = new SocketIOFileClient(socketBot);

var firstTime = true;

var game = false;
var gameBegan = false;
var botNumber = -1;
var attempts = 3;
var botNumberRange = 11;
var counter = 0;

var uploading = false;

var maySendInfo = false;
var messageOnceAfterOnlineAgainWasSent = true;
var botOffline = false;

var fireworkExists = false;
var fireworkRunning = false;

var currentPic = null;

if (localStorage.getItem('botSprite') === null || localStorage.getItem('botSprite') === undefined) {
    localStorage.setItem('botSprite', 'creeper');
}
 
uploader.on('start', function(fileInfo) {
    console.log('Start uploading', fileInfo);
});

uploader.on('complete', function(fileInfo) {
    console.log('Upload Complete', fileInfo);
});

uploader.on('error', function(err) {
    botSay(botSadFailedUpload[Math.floor(Math.random()*botSadFailedUpload.length)], "_sad.png")
    console.log('Error!', err);
});

uploader.on('abort', function(fileInfo) {
    console.log('Aborted: ', fileInfo);
});

socketBot.on('connect_error', (error) => {
    botOffline = true;
});

socketBot.on('connect', () => {
    botOffline = false;
});

setTimeout(function() {
    loadingStop();
    botLogic();
},
3000);

function setUploadButtonStyle(maxFileNameLength) {
    let fileInput  = document.getElementsByClassName("input-file"); 
    let button = document.getElementById("choose-file-label");
      
    button.addEventListener("keydown", function(event) {  
        if (event.keyCode == 13 || event.keyCode == 32 ) {  
            fileInput[0].focus();  
        }  
    });

    button.addEventListener("click", function(event) {
        fileInput[0].focus();       
        return false;
    });  

    fileInput[0].addEventListener("change", function(event) {  
        let stringForChanges = this.value;
        stringForChanges = stringForChanges.replace(/.+\\/, "");

        if (stringForChanges.length > maxFileNameLength) {
            button.innerHTML = stringForChanges.substr(0, maxFileNameLength) + "...";
            changeUploadStyle();
        } else {         
            button.innerHTML = stringForChanges;
            changeUploadStyle();
        }
 
        if (button.innerHTML === "") {         
            button.innerHTML = "Выбери картинку...";
            changeUploadStyle(true);
        }
    });  
}

function changeUploadStyle(reverse = false) {
    let element = document.getElementById("choose-file-label");
    if (!reverse) {
        element.classList.remove("input-file-trigger");
        element.classList.add("input-file-chosen");
    } else {
        element.classList.remove("input-file-chosen");
        element.classList.add("input-file-trigger");
    }
}

function loadingStop() { $(function() { 
    $(".bot-loading").css('opacity', '0'); 
    setTimeout(function() {
        $(".bot-loading").css('display', 'none');
    }, 1500);
    maySendInfo = true;
});}

function botSay(phrase, emotion) { $(function() {
    $("#bot-chat").html(phrase);
    $("#bot").css('background-image', 'url(' + pathToSprite + getCurrentBotName() + emotion + ')');
});}

function getCurrentBotName() {
    return localStorage.getItem('botSprite');
}

function setOpacity(oldPicOpacity, newPicOpacity) {$(function() {
    setTimeout(function() {
        $("#random-pic-old").css("opacity", oldPicOpacity);
        $("#random-pic-new").css("opacity", newPicOpacity);   
    }, 10);
});}

function botLogic() { $(function() {   
    if (firstTime) {
        if (!botOffline) {
            botSay("Приветствую!", "_normal.png");
            $("#bot").css('opacity', '1');           
            $("#bot-chat").css('opacity', '1');
            $("#bot-interaction").css('opacity', '1'); 
            messageOnceAfterOnlineAgainWasSent = true;
        } else {
            $("#comm").attr("disabled", "disabled");
            botSay(`К сожалению, бот сейчас оффлайн.<br><img src='${pathToFail}bot-offline.gif'>`, "_sad.png");
            $("#bot").css('opacity', '1');                   
            $("#bot-chat").css('opacity', '1'); 
            $("#bot-interaction").css('opacity', '1');
            messageOnceAfterOnlineAgainWasSent = false;
        }
       
        if (getCurrentBotName() === 'enderman') {
            $("#bot").css('width', '900px');
            $("#bot").css('height', '1116px');
        } else {
            $("#bot").css('width', '750px');
            $("#bot").css('height', '930px');
        }
        firstTime = false;
    }
    
    $("*").on("mouseleave mouseenter click mousemove", function(wind) {  
        if (maySendInfo) {
            if (botOffline) {
                $("#comm").attr("disabled", "disabled");
                $("#bot-chat").css("opacity", "1");
                botSay(`К сожалению, бот сейчас оффлайн.<br><img src='${pathToFail}bot-offline.gif'>`, "_sad.png");
                messageOnceAfterOnlineAgainWasSent = false;
            } else {
                if (!messageOnceAfterOnlineAgainWasSent) {
                    $("#comm").removeAttr("disabled");
                    $("#bot-chat").css('opacity', '1');
                    botSay("Я снова здесь!", "_happy.png");
                    messageOnceAfterOnlineAgainWasSent = true;
                }
            }
        }
    });

    $("#bot").on("mouseleave mouseenter click", function(wind) {  
        $("#random-pic-old").css("opacity", "0");
        $("#random-pic-new").css("opacity", "0"); 
        $("#random-pic-old").addClass("undraggable");  
        $("#random-pic-new").addClass("undraggable");  
        setTimeout(function() {
            $("#random-pic-new").css('display', 'none');
            $("#random-pic-old").css('display', 'none');
        }, 1000);
        currentPic = null;
    });

    $("#bot").on("mouseleave", function(wind) {
        if (!botOffline) {   
            if (!game && !gameBegan && !uploading) {
                wind.preventDefault();
                $("#bot-chat").css("opacity", "0");
                $("#bot").css('background-image', 'url(' + pathToSprite + getCurrentBotName() + "_normal.png" + ')');   
            }     
        }
    });  

    $("#bot").on("mouseenter", function(wind) {   
        if (!botOffline) {
            if (!game && !gameBegan && !uploading) {
                wind.preventDefault();     
                $("#bot-chat").css("opacity", "1"); 
                botSay(botMouseEnterPhrases[Math.floor(Math.random()*botMouseEnterPhrases.length)], "_happy.png");   
            }   
        }
    });   

    $("#bot").on("click", function(wind) {  
        if (!botOffline) {
            wind.preventDefault();  
            $("#bot-chat").css("opacity", "1"); 
            botSay(botClickPhrases[Math.floor(Math.random()*botClickPhrases.length)], "_angry.png");
            game = false;
            gameBegan = false;
            uploading = false;    
        }    
    });   

    $("#bot-interaction").submit(function(wind) {      
        wind.preventDefault(); 
        if ($("#comm").val() !== "") {    
            $("#bot-chat").css("opacity", "1");         
            if (game) {
                socketBot.emit("answer", $("#comm").val());     
            } else if (gameBegan) {
                socketBot.emit("game number", $("#comm").val());
            } else if (uploading) {
                if ($("#comm").val() === "send") {
                    let fileEl = document.getElementById('my-file');
                    let uploadId = uploader.upload(fileEl, {
                        data: { }
                    });
                    socketBot.emit("send", $("#comm").val());
                    uploading = false;
                } else if ($("#comm").val() === "exit") {
                    botSay(botSadNoUpload[Math.floor(Math.random()*botSadNoUpload.length)], "_sad.png");
                    uploading = false;
                }
            } else {
                if ($("#comm").val() !== "random_image") {
                    $("#random-pic-old").css("opacity", "0");
                    $("#random-pic-new").css("opacity", "0");   
                    $("#random-pic-old").addClass("undraggable");  
                    $("#random-pic-new").addClass("undraggable");  
                    setTimeout(function() {
                        $("#random-pic-new").css('display', 'none');
                        $("#random-pic-old").css('display', 'none');
                    }, 1000);
                    currentPic = null;
                }
                socketBot.emit("bot", $("#comm").val());   
            }
            $("#comm").val("");
        }        
    });  

    socketBot.on("send", function(message) {
        if (message === "fine") {
            botSay(botHappySuccessUpload[Math.floor(Math.random()*botHappySuccessUpload.length)], "_happy.png");
        } else {
            botSay(botSadFailedUpload[Math.floor(Math.random()*botSadFailedUpload.length)], "_sad.png");
        }
    });

    socketBot.on("game number", function(message) {
        if (botNumber != -1) {
                            
            if (counter < attempts) { 
                if (message == botNumber) {
                    counter = attempts;
                } else {
                    botSay(gameWrongAnswer[Math.floor(Math.random()*gameWrongAnswer.length)], "_happy.png");
                }
                counter++;
            } 

            if (counter == attempts + 1) {
                botSay(gamePlayerWin[Math.floor(Math.random()*gamePlayerWin.length)], "_shy.png");
                gameBegan = false;
                botNumber = -1;
            } else if (counter == attempts) {
                botSay(gamePlayerLose[Math.floor(Math.random()*gamePlayerLose.length)], "_happy.png");
                gameBegan = false;
                botNumber = -1;
            }
                          
        } else {
            if (counter < attempts) {
                if (message === "yes") {
                    counter = attempts;
                }
                if (counter + 1 < attempts) {
                    botSay('Это число ' + Math.floor(Math.random()*botNumberRange) + '?', "_normal.png");
                }
                counter++;
            }
            if (counter == attempts + 1) {
                botSay(gameBotWin[Math.floor(Math.random()*gameBotWin.length)], "_happy.png");
                gameBegan = false;
            } else if (counter == attempts) {
                botSay(gameBotLose[Math.floor(Math.random()*gameBotLose.length)], "_sad.png");
                gameBegan = false;
            }
        }
    });

    socketBot.on("answer", function(message) {       
        if (message === "ask") {
            botSay('Хммм... Это число ' + Math.floor(Math.random()*botNumberRange) + '?', "_normal.png");
        } else {
            botNumber = message;
            botSay(gameLetsPlay[Math.floor(Math.random()*gameLetsPlay.length)], "_happy.png");
        }
        counter = 0;
        game = false;
        gameBegan = true;
    });

    socketBot.on("help", function(message) { 
        botSay(`Вот полный список всего, что я умею: ${message}`, "_normal.png");
    });

    socketBot.on("new skin", function(message) { 
        if (message !== getCurrentBotName()) {
            botSay(botSadChange[Math.floor(Math.random()*botSadChange.length)], "_sad.png");
            setTimeout(function () {
                localStorage.setItem('botSprite', message);
                if (getCurrentBotName() == "enderman") {
                    $("#bot").css('width', '900px');
                    $("#bot").css('height', '1116px');
                } else {
                    $("#bot").css('width', '750px');
                    $("#bot").css('height', '930px');
                }
                botSay("А вот и я", "_normal.png");
            }, 2000);
            
        } else {
            botSay(botAlreadyHere[Math.floor(Math.random()*botAlreadyHere.length)], "_happy.png");     
        }
    });

    socketBot.on("game", function(message) { 
        game = true;
        botSay("Хорошо, ты хочешь загадывать или отгадывать? Только учти, мы будем играть в диапазоне чисел от 0 до 10", "_normal.png");
    });

    socketBot.on("random image", function(imageName) {  
        botSay(botTiredGetPic[Math.floor(Math.random()*botTiredGetPic.length)] + "<br>", "_tired.png");      
        $("#bot-pic-sender").css('width', '28em');
        if (currentPic !== null) {
            $("#bot-pic-sender").html("<img id='random-pic-new' height='450px' width='800px' src='" + pathToImg + imageName + "'>" +
                "<img id='random-pic-old' height='450px' width='800px' src='" + currentPic + "'>");    
            setOpacity("0", "1");      
           
        } else {
            $("#bot-pic-sender").html("<img id='random-pic-new' height='450px' width='800px' src='" + pathToImg + imageName + "'>");
            setOpacity("1", "1");
        }
        
        currentPic = pathToImg + imageName;
    });

    socketBot.on("gift image", function(message) {  
        uploading = true;
        $("#bot-chat").html("Выбери картинку, которую хочешь мне передать<br>" + message);
        $("#bot").css('background-image', 'url(' + pathToSprite + getCurrentBotName() + "_normal.png" + ')');   
        $("#bot-chat").css('width', '28em');
        setUploadButtonStyle(14);
    });

    socketBot.on("firework", function(message) {         
        if (!fireworkExists) {
            botSay(botFireworks[Math.floor(Math.random()*botFireworks.length)], "_happy.png");       
            $("#bot-interaction").append("<img id='firework-left' class='unselectable undraggable' src='" + pathToFail + "firework.gif'>");
            $("#bot-interaction").append("<img id='firework-right' class='unselectable undraggable' src='" + pathToFail + "firework.gif'>");
            fireworkExists = true;
            fireworkRunning = true;
        } else {
            if (fireworkRunning) {
                botSay(botFireworksAlreadyRunning[Math.floor(Math.random()*botFireworksAlreadyRunning.length)], "_normal.png"); 
            } else {
                botSay(botFireworks[Math.floor(Math.random()*botFireworks.length)], "_happy.png"); 
                $("#firework-left").css("display", "block");
                $("#firework-right").css("display", "block");
                $("#firework-left").css("opacity", "1");
                $("#firework-right").css("opacity", "1");
                fireworkRunning = true;
            }
        }
    });

    socketBot.on("nofire", function(message) { 
        if (!fireworkRunning) {
            botSay(botFireworksNotRunning[Math.floor(Math.random()*botFireworksNotRunning.length)], "_normal.png");
        } else {
            botSay(botStopFireworks[Math.floor(Math.random()*botStopFireworks.length)], "_normal.png");
            setTimeout(function() {
                $("#firework-left").css("display", "none");
                $("#firework-right").css("display", "none");
            }, 1000);
            $("#firework-left").css("opacity", "0");
            $("#firework-right").css("opacity", "0");
            fireworkRunning = false;
        }        
    });

    socketBot.on("unknown", function(message) { 
        game = false;
        botSay(unknownForBot[Math.floor(Math.random()*unknownForBot.length)], "_sad.png"); 
    });
});}