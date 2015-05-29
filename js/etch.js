$(window).load(function(){

var colorMode = false;
var standard = 16;
var box = 512;
function isNumeric(obj) {
    return !jQuery.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
}
function prompt() {
    bootbox.prompt("Enter canvas size:", function (result) {
        if (result !== null && isNumeric(result)) {
            $("#container").empty();
            initGrid(result);
        }
    });
}
function initGrid(size) {
    if (size < 0) size = 0;
    else if (size > 64) size = 64;
    var px = box / size;
    var string = "<div class=\"pixel\" style=\"width:" + px + "px;height:" + px + "px;\"></div>";
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            $("#container").append(string);
        }
    }
    initHover();
}
function initHover() {
    if (colorMode) {
        $(".pixel").mouseenter(function () {
            if ($(this).css("background-color") !== "rgb(238, 238, 238)") {
                var block = $.Color($(this).css("background-color"));
                $(this).css("background-color", block.lightness('-=0.1'));
            } else {
                $(this).css("background-color", randomColor({
                    luminosity: 'light'
                }));
            }
        });
    } else {
        $(".pixel").mouseenter(function () {
            $(this).css("background-color", "#aaa");
        });
    }
}
function initButtons() {
    $("#clear-button").on("click", function () {
        $(".pixel").css("background-color", "#eee");
    });
    $("#new-button").on("click", function () {
        prompt();
    });
    $("#rainbow-button").on("click", function () {
        if (colorMode) {
            colorMode = false;
        } else {
            colorMode = true;
        }
        $(".pixel").unbind("mouseenter");
        initHover();
    });
    $("#monochrome-button").on("click", function () {
        if (colorMode) {
            colorMode = true;
        } else {
            colorMode = false;
        }
        $(".pixel").unbind("mouseenter");
        initHover();
    });
    $(".btn").mouseup(function () {
        $(this).blur();
    });
}


$(document).load(function () {
    initGrid(standard);
    initButtons();
});
});
