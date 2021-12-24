if (socket !== undefined) {
    socket.close();
}

var socket = io("http://localhost:3000");

var typing = false;
var timeout = undefined;

var scrollingLength = 100;
var element = document.getElementsByClassName("container-chat");

function scrollAndChange() {
    element[0].scrollBy(0, scrollingLength);
    scrollingLength += 50;
}

function timeoutFunction() {
    typing = false;
    socket.emit("noone is typing");
}

$(function() {  
    $("#mes").keydown(function(e) {
        if (e.keyCode != 13) {
            if (typing == false) {
                typing = true;
                socket.emit("someone is typing");
                timeout = setTimeout(timeoutFunction, 500);
            } else {
                clearTimeout(timeout);
                timeout = setTimeout(timeoutFunction, 500);
            }
        }
    });

    $("#send-message-action").submit(function(wind) {   
        wind.preventDefault();
        socket.emit("chat message", $("#mes").val());
        $("#mes").val("");         
    });    

    socket.on("chat message", function(message) {
        if (message !== "") {
            $("#messages").append($("<li>").text(message));  
            scrollAndChange();
        }
    });

    socket.on("chat link", function(message) {
        let link = $("<a>").addClass("chat-link").text(message).attr("href", message).attr("target", "_blank").attr("rel", "noopener noreferrer");
        $("#messages").append($("<li>").append(link));     
        scrollAndChange();
    });

    socket.on("chat emoticon", function(message) {
        let emoticon = $("<img>").attr("src", message).attr("width", "128").attr("height", "128");
        $("#messages").append($("<li>").append(emoticon));     
        scrollAndChange();
    });

    socket.on("someone is typing", function(message) {
        $("#user-typing-state").addClass("typing");   
    });

    socket.on("noone is typing", function(message) {
        $("#user-typing-state").removeClass("typing"); 
    });

    socket.on("user connected", function(message) {
        $("#messages").append($("<li>").text("Новый пользователь присоединился к чату.").addClass("system-info"));
        $("#now-online").html(message);
    });

    socket.on("you have connected", function(message) {
        $("#messages").append($("<li>").text("Вы подключились к чату.").addClass("system-info"));
        $("#now-online").html(message);
    });

    socket.on("user disconnected", function(message) {
        $("#messages").append($("<li>").text("Пользователь отключился от чата.").addClass("system-info"));
        $("#now-online").html(message);
    });
});