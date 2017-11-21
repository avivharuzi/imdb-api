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
    });

    FULL_MOVIE.on("click", "#back", function () {
        FULL_MOVIE.fadeOut();
        SHORT_MOVIES.fadeIn();
    });
});

function getAllData(searchValue, searchBy) {
    const FINALLE_URL = API_URL + API_KEY + searchBy + "&s=" + searchValue;

    $.ajax({
        method: "GET",
        url: FINALLE_URL,
        success: function (data, success, response) {
            if (data.Response !== "False") {
                shortMovieTemplate(data.Search);
                equalHeight($(".short-movie"));
            } else {
                errorSearchTemplate();
            }
        }
    });
}

function getDataById(id) {
    const FINALLE_URL = API_URL + API_KEY + "&type=movie&plot=short&i=" + id;
    
    $.ajax({
        method: "GET",
        url: FINALLE_URL,
        success: function (data, success, response) {
            fullMovieTemplate(data);
            console.log(data);
        }
    });
}

function equalHeight(group) {
    let tallest = 0;
    
    group.each(function() {
        let thisHeight = $(this).height();
        if (thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    group.height(tallest);
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$(document).ajaxStart(function () {
    NProgress.start();
});

$(document).ajaxStop(function () {
    NProgress.done();
});