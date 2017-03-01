/**
 * Created by karina on 26/02/17.
 */
"use strict";

var source = $('#templateWeather').html();
var template = Handlebars.compile(source);
var cities = [];
var cityData;


$("#cityNameInput").keypress(function (event) {
    if (event.which === 13) {
        var inputValue = $("#cityNameInput").val();
        fetch(inputValue);
        event.preventDefault();

    }
});

$(".getTempButton").on("click", function () {
    var inputValue = $("#cityNameInput").val();
    fetch(inputValue);

});


var fetch = function (inputValue) {
    $.ajax({
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + inputValue + "&appid=416dbc4f43d4fc48668c53dbc2291d04",
        dataType: "json",
        success: function (data) {
            cityData = data;
            createCity();
            renderPost();
            renderComments();


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    })
};


// variable for storing our posts div
var $posts = $('.city-display');

var createCity = function () {
    var dataObj = {
        nameCity: cityData.name,
        cityWeatherC: (cityData.main.temp - 273).toFixed(2),
        cityWeatherF: (((cityData.main.temp - 273) * 1.8) + 32).toFixed(2),
        iconWeather:cityData.weather[0].icon,
        description: cityData.weather[0].description,
        comments: []
    };
    cities.push(dataObj);
};

var renderPost = function () {
    $posts.empty();
    for (var i = 0; i < cities.length; i += 1) {
        var post = cities[i];
        var newHTML = template(post);
        $('.city-display').append(newHTML);
    }
}


var createComments = function (text, cityIndex) {
    var comment = {text: text};
    cities[cityIndex].comments.push(comment);

};

var renderComments = function () {
    $(".comments-list").empty();

    for (var i = 0; i < cities.length; i++) {
        var $post = $('.city-display').find('.cityLevel').eq(i);

        for (var j = 0; j < cities[i].comments.length; j++) {
            var comment = cities[i].comments[j];
            console.log(comment);


            $post.find('.comments-list').append(
                '<div class="comment">' + comment.text + '</div>');
        }
    }
};

var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.cityLevel');
    console.log($clickedPost);
    var index = $clickedPost.index();

    cities.splice(index, 1);
    $clickedPost.remove();
};

//events

$posts.on('click', '#commentButton', function () {
    var text = $(this).parent().siblings('#commentInput').val();
    console.log(text);
    var cityIndex = $(this).parent().closest('.cityLevel').index();

    console.log(cityIndex);
    createComments(text, cityIndex);
    renderComments();

});


$('.city-display').on('click', '.remove-button', function () {
    removePost(this);
});
