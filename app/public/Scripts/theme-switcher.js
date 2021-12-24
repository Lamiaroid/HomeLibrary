$(function() {  
    $("#theme-switcher").on("click", function(wind) {
        let head = document.getElementsByTagName("head")[0];
        if (document.getElementsByTagName("style")[0] !== 'undefined') {
            $("style").remove();
        }
                   
        let style = document.createElement("style");
        head.appendChild(style);
        let sheet = style.sheet;  
        if ($("#theme-switcher").attr("checked") !== 'checked') {
            $("#theme-switcher").attr("checked", "");
            $(".about").css("box-shadow", "0 0 2em rgba(255, 0, 0, 0.8), 0 0 1em rgba(255, 0, 0, 0.8), inset 0 0 2em rgba(255, 0, 0, 0.8), inset 0 0 1em rgba(255, 0, 0, 0.8)");
            $(".about").css("background-color", "rgba(0, 0, 120, 0.7)");
            $(".container-chat-back").css("box-shadow", "0 0 2em rgba(255, 0, 0, 0.8), 0 0 1em rgba(255, 0, 0, 0.8), inset 0 0 2em rgba(255, 0, 0, 0.8), inset 0 0 1em rgba(255, 0, 0, 0.8)");
            $(".container-chat-back").css("background-color", "rgba(0, 0, 120, 0.7)");
            $(".container-info-back").css("box-shadow", "0 0 2em rgba(255, 0, 0, 0.8), 0 0 1em rgba(255, 0, 0, 0.8), inset 0 0 2em rgba(255, 0, 0, 0.8), inset 0 0 1em rgba(255, 0, 0, 0.8)");
            $(".container-info-back").css("background-color", "rgba(0, 0, 120, 0.7)");
                             
            sheet.insertRule("::-webkit-scrollbar {background-color: rgba(0, 0, 179, 0.6); width: 1em;}", 0);
            sheet.insertRule(".container-chat::-webkit-scrollbar {background-color: rgba(0, 0, 0, 0);}", 0);
            sheet.insertRule("::-webkit-scrollbar-track {background-color: none; border-radius: 1em;}", 0);
            sheet.insertRule(".container-chat::-webkit-scrollbar-track {background-color: rgba(0, 0, 179, 0.6);}", 0);
            sheet.insertRule("::-webkit-scrollbar-thumb {box-shadow: inset 0 0 1em rgba(163, 41, 179, 1), inset 0 0 1em rgba(163, 41, 122, 1); border-radius: 1em;}", 0);
            sheet.insertRule("::-webkit-scrollbar-thumb:hover {box-shadow: inset 0 0 2em black;}", 0);        
        } else {
            $("#theme-switcher").removeAttr("checked");   
            $(".about").css("box-shadow", "inset 0 0 2em red, 0 0 1em red");
            $(".about").css("background-color", "rgba(0, 0, 0, 0.7)");
            $(".container-chat-back").css("box-shadow", "inset 0 0 2em red, 0 0 1em red");
            $(".container-chat-back").css("background-color", "rgba(0, 0, 0, 0.7)");  
            $(".container-info-back").css("box-shadow", "inset 0 0 2em red, 0 0 1em red");
            $(".container-info-back").css("background-color", "rgba(0, 0, 0, 0.7)");        

            sheet.insertRule("::-webkit-scrollbar {background-color: rgba(178, 0, 0, 0.6); width: 1em;}", 0);
            sheet.insertRule(".container-chat::-webkit-scrollbar {background-color: rgba(0, 0, 0, 0);}", 0);
            sheet.insertRule("::-webkit-scrollbar-track {background-color: none; border-radius: 1em;}", 0);
            sheet.insertRule(".container-chat::-webkit-scrollbar-track {box-shadow: inset 0 0 0.3em rgba(178, 0, 0, 0.7), inset 0 0 2em rgba(0, 0, 0, 0.7);}", 0);
            sheet.insertRule(".container-chat::-webkit-scrollbar-thumb:hover {background-color: maroon; box-shadow: inset 0 0 1em rgba(0, 0, 0, 1), inset 0 0 1em rgba(0, 0, 0, 1);}", 0);
            sheet.insertRule("::-webkit-scrollbar-thumb {box-shadow: inset 0 0 0.3em rgba(178, 0, 0, 0.7), inset 0 0 2em rgba(0, 0, 0, 0.7); border-radius: 1em;}", 0);
            sheet.insertRule("::-webkit-scrollbar-thumb:hover {box-shadow: inset 0 0 1em rgba(0, 0, 0, 1), inset 0 0 1em rgba(0, 0, 0, 1);}", 0);              
        }
    });        
});