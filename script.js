// GLOBAL VARIABLES

const baseImgURL = "https://www.themoviedb.org/t/p/w440_and_h660_face/"
var currentQuery = ""
var currentPage = 1

// HTML QUERY SELECTORS AND GET ELEMENT CALLS

const moreButtonElement = document.querySelector("#more-button");
const searchElement = document.querySelector("#current-query");
const clearElement = document.querySelector("#clear");
const moviesDiv = document.getElementById("movies");
const dimScreen = document.getElementById("dim");
const dimX = document.getElementById("x");
const dimContent = document.getElementById("content");
const dimTitle = document.getElementById("dim-title");
const dimTag = document.getElementById("dim-tagline");
const dimVid = document.getElementById("dim-video");
const dimOver = document.getElementById("dim-overview");
const dimElements = [dimScreen, dimX, dimContent, dimTitle, dimTag, dimOver, dimVid];

// MOVIE FETCHING FUNCTIONS

async function getNowPlaying() {
    try { 
        const results = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=804e54f236cc43faf2e40adb1019cf62&language=en-US&page=${currentPage}`);
        const data = await results.json();
        console.log(data);
        return data;
    } catch(err) {
        console.error(err);
    }
}

async function searchMovies() {
    try { 
        const results = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=804e54f236cc43faf2e40adb1019cf62&language=en-US&query=${currentQuery}&page=${currentPage}&include_adult=false`);
        const data = await results.json();
        console.log(data);
        return data;
    } catch(err) {
        console.error(err);
    }
}

function getMovies() {
    if (currentQuery) {
        return searchMovies();
    }
    else {
        return getNowPlaying();
    }
}

async function getMovieInfo(movieID) {
    try { 
        let results = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=804e54f236cc43faf2e40adb1019cf62&language=en-US`);
        let data = await results.json();
        if (data.video) {
           results = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=804e54f236cc43faf2e40adb1019cf62&language=en-US`);
           data += await results.json();
        }
        console.log(data);
        return data;
    } catch(err) {
        console.error(err);
    }
}

// HTML MOVIE CARD RENDERING FUNCTION

function renderMovieCard(div, movieObj) {
    div.innerHTML += `
    <div class="movie-card item">
    <div class="image" onclick="movieClicked('${movieObj.id}')">
    ${movieObj.poster_path === null ? 
        `<h2 class="no-image" style="color: red">[No Image Found]</h2>` : 
        `<img class="movie-poster-image" src=` + baseImgURL + movieObj.poster_path + ` alt="movie poster image" />`}
    </div>
    <br>
    <h2 class="title" onclick="movieClicked('${movieObj.id}')">Title: ${movieObj.title}</h2>
    <br>
    <h3>Votes: ${movieObj.vote_average}</h3>
    </div>
    `
}

// PAGE STATUS UPDATE FUNCTIONS

function incrementCurrentPage() {
    currentPage++;
    return currentPage;
}

function resetCurrentPage() {
    currentPage = 1;
    return currentPage;
}

function updateCurrentQuery() {
    currentQuery = searchElement.value;
}

function clearMovies(div) {
    div.innerHTML = ``;
}

function movieClicked(movieID) {
    console.log(movieID);
    openDim(movieID);
}

async function openDim(movieID) {
    data = await getMovieInfo(movieID);
    dimTitle.innerHTML = `${data.title} (${data.release_date.substring(0,4)})`;
    dimTag.innerHTML = data.tagline;
    dimOver.innerHTML = data.overview;
    dimElements.forEach(el => {el.classList.add("dim-screen");});
}

function closeDim() {
    dimElements.forEach(el => {el.classList.remove("dim-screen");});
}

// ADD EVENT LISTENERS

function attachEventListeners() {
    
    // search bar refreshes movie when edited
    searchElement.addEventListener('input', async () => {
        updateCurrentQuery();
        resetCurrentPage();
        clearMovies(moviesDiv);
        const movieData = await getMovies();
        for (const index in movieData.results) {
            renderMovieCard(moviesDiv, movieData.results[index]);
        }});
    
    // more button loads next page of movies
    moreButtonElement.addEventListener('click', async () => {
        incrementCurrentPage();
        const movieData = await getMovies();
        for (const index in movieData.results) {
            renderMovieCard(moviesDiv, movieData.results[index]);
        }});

    // clear button reverts search bar and movie results
    clearElement.addEventListener('click', async () => {
        searchElement.value = "";
        updateCurrentQuery();
        resetCurrentPage();
        clearMovies(moviesDiv)
        const movieData = await getMovies();
        for (const index in movieData.results) {
            renderMovieCard(moviesDiv, movieData.results[index]);
        }});
}

// WINDOW ONLOAD CALLS

window.onload = async () => {
    const movieData = await getMovies();
    for (const index in movieData.results) {
        renderMovieCard(moviesDiv, movieData.results[index]);
    }
    attachEventListeners(); 
}