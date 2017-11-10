"use strict";

const API_URL = "http://www.omdbapi.com/?apikey=";
const API_KEY = "4e4e188f";
const DATA_CONTAINER = $("#mainContainer");
const FULL_MOVIE = $("#fullMovie");
const SHORT_MOVIES = $("#shortMovies");

$(function () {
    $("select").material_select();

    $("#search").on("click", function () {
        let searchValue = $("#searchValue").val();
        let searchBy = $("#searchBy").val();
        FULL_MOVIE.fadeOut();
        getAllData(searchValue, searchBy);
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

function getAllData(searchValue, searchBy) {
    let finallyUrl = API_URL + API_KEY + searchBy + "&s=" + searchValue;

    $.ajax({
        method: "GET",
        url: finallyUrl,
        ajaxStart: NProgress.start(),
        success: function (data, success, response) {
            if (data.Response !== "False") {
                shortMovieTemplate(data.Search);
            } else {
                errorSearchTemplate();
            }
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
            console.log(data);
        },
        ajaxStop: NProgress.done()
    });
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}