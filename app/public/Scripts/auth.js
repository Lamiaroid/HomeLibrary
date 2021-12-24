$(function() {  
    $("#auth-form").submit(function(wind) {   
        wind.preventDefault();
        $.post('/main', {login: $("input[name=login]").val(), password: $("input[name=password]").val()}, function(data) {
            $("body").append(`<form action="/homepage" method="post" id="go-in"></form>`);
            $("#go-in").submit();
        })
        .fail(function(xhr, status, error) {
            if (error === "Unauthorized") {           
                $("#fail-auth-container").html("Мы не смогли вас идентифицировать. Пожалуйста, внимательно проверьте корректность введённых данных");
                $("#fail-auth-container").css("opacity", "1");
            } else if (error === "Internal Server Error") {         
                $("#fail-auth-container").html("Извините, на сервере сейчас неполадки. Попробуйте позже");
                $("#fail-auth-container").css("opacity", "1");
            }
        });        
    });    

    $("#registration-form").submit(function(wind) {   
        wind.preventDefault();
        $.post('/createAccount', {login: $("input[name=login]").val(), password: $("input[name=password]").val(), passwordSecondTime: $("input[name=passwordSecondTime]").val()}, function(data) {
            $("body").append(`<form action="/homepage" method="post" id="go-in"></form>`);
            $("#go-in").submit();
        })
        .fail(function(xhr, status, error) {
            switch (error) {
                case "Unauthorized":
                    $("#fail-reg-container").html("К сожалению, данный логин уже занят");
                    $("#fail-reg-container").css("opacity", "1");
                    break;

                case "Precondition Failed":
                    $("#fail-reg-container").html("Пароли не совпадают");
                    $("#fail-reg-container").css("opacity", "1");
                    break;

                case "Internal Server Error":
                    $("#fail-reg-container").html("Извините, на сервере сейчас неполадки. Попробуйте позже");
                    $("#fail-reg-container").css("opacity", "1");
                    break;
            } 
        });        
    });      
});