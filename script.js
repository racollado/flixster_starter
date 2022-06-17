// GLOBAL VARIABLES

const baseImgURL = "https://www.themoviedb.org/t/p/w440_and_h660_face/";
const baseVidURL = "https://www.youtube.com/embed/";
var currentQuery = "";
var currentPage = 1;
var dimmed = false;
var loading = false;

// HTML ELEMENTS

const nowPlaying = document.getElementById("now-playing");
const moreButtonElement = document.querySelector("#load-more-movies-btn");
const searchElement = document.querySelector("#search-input");
const clearElement = document.querySelector("#close-search-btn");
const moviesDiv = document.getElementById("movies-grid");
const loader = document.getElementById("loader");
const dimScreen = document.getElementById("dim");
const dimX = document.getElementById("x");
const dimContent = document.getElementById("content");
const dimTitle = document.getElementById("dim-title");
const dimTag = document.getElementById("dim-tagline");
const dimVid = document.getElementById("dim-video");
const dimOver = document.getElementById("dim-overview");
const dimSelect = document.getElementById("video-select")
const dimElements = [dimScreen, dimX, dimContent, dimTitle, dimTag, dimOver, dimVid, dimSelect];

// MOVIE DATA FETCHING FUNCTIONS (TMDB API)

// gets now playing movies
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

// get movies based on search input
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

// if no search entered, get now playing movies. Else, perform query search
function getMovies() {
    if (currentQuery) {
        return searchMovies();
    }
    else {
        return getNowPlaying();
    }
}

// appends video info to detailed movie info
async function getMovieInfo(movieID) {
    try { 
        let results = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=804e54f236cc43faf2e40adb1019cf62&language=en-US&append_to_response=videos`);
        let data = await results.json();
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
        `<h2 class="movie-poster no-image" style="color: red">[No Image Found]</h2>` : 
        `<img class="movie-poster" src=` + baseImgURL + movieObj.poster_path + ` alt="movie poster image" />`}
    </div>
    <br>
    <h2 class="movie-title" onclick="movieClicked('${movieObj.id}')">Title: ${movieObj.title}</h2>
    <br>
    <h3 class="movie-votes">Votes: ${movieObj.vote_average}</h3>
    </div>
    `;
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
    currentQuery = escape(searchElement.value);
    if (currentQuery) {
        nowPlaying.classList.add("hidden");
    }
    else {
        nowPlaying.classList.remove("hidden");
    }
}

function clearMovies(div) {
    div.innerHTML = ``;
}

function movieClicked(movieID) {
    openDim(movieID);
}

// gets detailed movie info and renders dimmed pop-up
async function openDim(movieID) {
    dimmed = true;
    data = await getMovieInfo(movieID);
    dimTitle.innerHTML = `${data.title} (${data.release_date.substring(0,4)})`;
    dimTag.innerHTML = data.tagline;
    dimSelect.innerHTML = ``;
    // setting video src and dropdown options
    const vids = data.videos.results;
    if (vids.length !== 0) {
        dimVid.src = baseVidURL + vids[0].key;
        for (let i = 0; i < vids.length; i++) {
            dimSelect.innerHTML += `<option value="${vids[i].key}">Video ${i+1}</option>`;
        }
    }
    else {
        dimVid.src = "";
        dimSelect.innerHTML += `<option value="">No videos</option>`
    }
    dimOver.innerHTML = data.overview;
    dimElements.forEach(el => {el.classList.add("dim-screen");});
}

function closeDim() {
    dimmed = false;
    dimElements.forEach(el => {el.classList.remove("dim-screen");});
}

function beginLoading() {
    loader.classList.remove("hidden");
}

function endLoading() {
    loader.classList.add("hidden");
}

// ADD EVENT LISTENERS

function attachEventListeners() {
    
    // search bar refreshes movie when edited
    searchElement.addEventListener('input', async () => {
        beginLoading();
        updateCurrentQuery();
        resetCurrentPage();
        clearMovies(moviesDiv);
        const movieData = await getMovies();
        for (const index in movieData.results) {
            renderMovieCard(moviesDiv, movieData.results[index]);
        }
        endLoading();
    });        
    
    // more button loads next page of movies
    moreButtonElement.addEventListener('click', async () => {
        beginLoading();
        incrementCurrentPage();
        const movieData = await getMovies();
        for (const index in movieData.results) {
            renderMovieCard(moviesDiv, movieData.results[index]);
        }
        endLoading();
    });

    // clear button reverts search bar and movie results
    clearElement.addEventListener('click', async () => {
        beginLoading();
        searchElement.value = "";
        updateCurrentQuery();
        resetCurrentPage();
        clearMovies(moviesDiv)
        const movieData = await getMovies();
        for (const index in movieData.results) {
            renderMovieCard(moviesDiv, movieData.results[index]);
        }
        endLoading();
    });

    // escape key will close pop-up and enter key will perform search
    document.addEventListener('keydown', async function(event) {
        if (event.key === "Escape") {
            closeDim();
        } 
        else if (event.key === "Enter") {
            beginLoading(loader);
            updateCurrentQuery();
            resetCurrentPage();
            clearMovies(moviesDiv);
            const movieData = await getMovies();
            for (const index in movieData.results) {
                renderMovieCard(moviesDiv, movieData.results[index]);
            }
            endLoading(loader);
        }
    });

    // clicking outside of dimmed content closes page
    dimScreen.addEventListener('click', function(event) {
        if(dimmed && event.target.id === "dim") {
            closeDim();
        }
    });

    // video selection dropdown refreshes video
    beginLoading();
    dimSelect.addEventListener('change', () => {
        dimVid.src = baseVidURL + dimSelect.value;
    });
    endLoading();
}

// WINDOW ONLOAD CALLS

window.onload = async () => {
    // get initial movies and render them
    const movieData = await getMovies(); 
    for (const index in movieData.results) {
        renderMovieCard(moviesDiv, movieData.results[index]);
    }

    attachEventListeners(); 
}