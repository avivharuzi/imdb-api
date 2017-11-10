"use strict";

function shortMovieTemplate(data) {
    let output = `<div class="row">`;

    $(data).each(function (index, value) {
        if (value.Poster === "N/A") {
            value.Poster = "images/no-image.png";
        }

        output +=
        `<div class="col l3 m6 s12 card-movie">
            <div class="card">
                <div class="card-image">
                    <img src="${value.Poster}" height="450px" alt="N/A">
                </div>
                <div class="card-content">
                    <span class="card-title grey-text text-darken-4">${value.Title}</span>
                    <p>${value.Year}</p>
                    <p class="section"><button class="waves-effect waves-light btn blue read-more" value="${value.imdbID}">READ MORE</button></p>
                </div>
            </div>
        </div>`;
    });
    output += `</div>`;
    SHORT_MOVIES.html(output).fadeIn();
}

function fullMovieTemplate(data) {
    if (data.Poster === "N/A") {
        data.Poster = "images/no-image.png";
    }

    let output =
    `<div class="row">
        <div class="col s12 card-movie">
            <div class="card">
                <div class="row">
                    <div class="col l4 s12">
                        <div class="card-image">
                            <img src="${data.Poster}" width="200" height="auto" alt="N/A">
                        </div>
                    </div>
                    <div class="col l8 s12">
                        <div class="card-content">
                            <div class="row">
                                <div class="col l9 s12">
                                    <h1 class="flow-text grey-text text-darken-4">${data.Title} (${data.Year}) (${data.Type.capitalize()})
                                    <br><br><span><i class="fa fa-star"></i> ${data.imdbRating}<br><br>${data.imdbVotes} Votes</span></h1>
                                    <p>${data.Runtime} | ${data.Genre} | ${data.Released} (${data.Country})</p>
                                    <p class="section">
                                        Director: ${data.Director}
                                        <br>
                                        Writer: ${data.Writer}
                                        <br>
                                        Production: ${data.Production}
                                        <br>
                                        Actors: ${data.Actors}
                                    </p>
                                    <p class="section">${data.Plot}</p>
                                </div>
                                <div class="col l3 s12 flow-text">
                                    <button class="waves-effect waves-light btn blue" id="back">BACK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    FULL_MOVIE.html(output).fadeIn();
}

function errorSearchTemplate() {
    let output =
    `<div class="row">
        <div class="col s10 offset-s1">
            <div id="card-alert" class="card red center-align">
                <div class="card-content white-text">
                    <h5><i class="fa fa-exclamation-circle"></i> NO RESULTS</h5>
                </div>
            </div>
        </div>
    </div>`;
    SHORT_MOVIES.html(output).fadeIn();
}