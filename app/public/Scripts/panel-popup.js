let panelState = 0;
$(function() {  
    $(".panel-activator").on("click", function(wind) { 
        if (panelState == 0) {
            $(".panel-activator").css("margin-top", "41em");
            $(".panel-activator").css("margin-left", "9em");
            $(".panel-content").css("margin-left", "0em");
            panelState = 1;
        } else {
            $(".panel-activator").css("margin-top", "0em");
            $(".panel-activator").css("margin-left", "0em");
            $(".panel-content").css("margin-left", "-22em");
            panelState = 0;
        }
    });        
});