"use strict";

const API_URL = "https://www.omdbapi.com/?apikey=";
const API_KEY = "4e4e188f";
const DATA_CONTAINER = $("#mainContainer");
const FULL_IMDB = $("#fullImdb");
const SHORT_IMDB = $("#shortImdb");

$(function () {
    $("select").material_select();

    $("#search").on("click", function () {
        let searchValue = $("#searchValue").val();
        let searchBy = $("#searchBy").val();
        FULL_IMDB.fadeOut();
        getAllData(searchValue, searchBy);
    });

    SHORT_IMDB.on("click", ".read-more", function () {
        let id = $(this).val();
        SHORT_IMDB.fadeOut();
        getDataById(id);
    });

    FULL_IMDB.on("click", "#back", function () {
        FULL_IMDB.fadeOut();
        SHORT_IMDB.fadeIn();
    });
});

function getAllData(searchValue, searchBy) {
    const FINALLE_URL = API_URL + API_KEY + searchBy + "&s=" + searchValue;

    $.ajax({
        method: "GET",
        url: FINALLE_URL,
        success: function (data, success, response) {
            if (data.Response !== "False") {
                shortImdbTemplate(data.Search);
                equalHeight($(".short-imdb"));
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
            fullImdbTemplate(data);
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
