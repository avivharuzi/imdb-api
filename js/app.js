"use strict";

const API_URL = "http://www.omdbapi.com/?apikey=";
const API_KEY = "4e4e188f";
const DATA_CONTAINER = $("#mainContainer");
const FULL_MOVIE = $("#fullMovie");
const SHORT_MOVIES = $("#shortMovies");

$(function () {
    $("#search").on("click", function () {
        let searchValue = $("#searchValue").val();
        FULL_MOVIE.fadeOut();
        getAllData(searchValue);
    });

    SHORT_MOVIES.on("click", ".read-more", function () {
        let id = $(this).val();
        SHORT_MOVIES.fadeOut();
        getDataById(id);
    });;

    FULL_MOVIE.on("click", "#back", function () {
        FULL_MOVIE.fadeOut();
        SHORT_MOVIES.fadeIn();
    });;
});

function getAllData(searchValue) {
    let finallyUrl = API_URL + API_KEY + "&type=movie&s=" + searchValue;

    $.ajax({
        method: "GET",
        url: finallyUrl,
        ajaxStart: NProgress.start(),
        success: function (data, success, response) {
            shortMovieTemplate(data.Search);
        },
        ajaxStop: NProgress.done()
    });
}

function getDataById(id) {
    let finallyUrl = API_URL + API_KEY + "&type=movie&plot=short&i=" + id;
    
    $.ajax({
        method: "GET",
        url: finallyUrl,
        ajaxStart: NProgress.start(),
        success: function (data, success, response) {
            fullMovieTemplate(data);
        },
        ajaxStop: NProgress.done()
    });
}