import { moddalWind, imgURL, imgPlaceholder, modal, spinner, timeout, } from "./utils.js"
import { addLocalStorageWached, addLocalStorageQueue } from "./addToLocalStorage.js";

export function toggleModal() {
    modal.classList.toggle("is-hidden");
  }

export function escape() {
    while(moddalWind.firstChild){moddalWind.firstChild.remove()}
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        while(moddalWind.firstChild){moddalWind.firstChild.remove()}
        modal.classList.add("is-hidden");
      }
    });
  }

export function selectId(event) {
  const id = event.target.id;
  return id;
}

export async function fetchMovies(id) {
  try {
    await spinner.removeAttribute('hidden')
    await timeout(300)
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=837f028f22fd2591f3672c74a92683e2&language=en-US`,
    );
    await spinner.setAttribute('hidden', '');
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (err) {
    return console.log(err);
  }};

export async function renderModal(movie) {
let markupSec = ""
const{poster_path, genres, vote_average, vote_count, popularity, original_title, overview} = movie;
let gen = genres.map(genre => genre.name).join(", ")
if(poster_path == null){;
  markupSec=`
  <img class="moddal__poster" src="${imgPlaceholder}" alt="plakat" />
  <div>
  <h1 class="moddal__title">${original_title}</h1>
  <div class="moddal__data"><p class="moddal__dataTitle moddal__data--1">Vote / Votes</p><div class="moddal__data"><p class="moddal__dataTxt moddal__voteA">${vote_average}</p>/<p class="moddal__dataTxt moddal__voteC">${vote_count}</p></div></div>
  <div class="moddal__data"><p class="moddal__dataTitle moddal__data--2">Popularity</p><p class="moddal__dataTxt">${popularity}</p></div>
  <div class="moddal__data"><p class="moddal__dataTitle moddal__data--3">Original Title</p><p class="moddal__dataTxt">${original_title}</p></div>
  <div class="moddal__data"><p class="moddal__dataTitle moddal__data--4">Genre</p><p class="moddal__dataTxt">${gen}</p></div>
  <h2 class="moddal__about">ABOUT</h2>
  <h3 class="moddal__aboutTxt">${overview}</h3>
  <div class="moddal__buttons"><button class="moddal__btn" watched>add to Watched</button><button class="moddal__btn" queue>add to queue</button></div>
  </div>`}
else {markupSec=`
<img class="moddal__poster" src="${imgURL}${poster_path}" alt="plakat" />
<div>
<h1 class="moddal__title">${original_title}</h1>
<div class="moddal__data"><p class="moddal__dataTitle moddal__data--1">Vote / Votes</p><div class="moddal__data"><p class="moddal__dataTxt moddal__voteA">${vote_average}</p>/<p class="moddal__dataTxt moddal__voteC">${vote_count}</p></div></div>
<div class="moddal__data"><p class="moddal__dataTitle moddal__data--2">Popularity</p><p class="moddal__dataTxt">${popularity}</p></div>
<div class="moddal__data"><p class="moddal__dataTitle moddal__data--3">Original Title</p><p class="moddal__dataTxt">${original_title}</p></div>
<div class="moddal__data"><p class="moddal__dataTitle moddal__data--4">Genre</p><p class="moddal__dataTxt">${gen}</p></div>
<h2 class="moddal__about">ABOUT</h2>
<h3 class="moddal__aboutTxt">${overview}</h3>
<div class="moddal__buttons"><button class="moddal__btn" watched>add to Watched</button><button class="moddal__btn" queue>add to queue</button></div>
</div>`}
  moddalWind.insertAdjacentHTML("beforeend", markupSec);
  
  const modalButtonWatched = document.querySelector("button[watched]");
  const modalButtonQueue = document.querySelector("button[queue]");
  
  modalButtonWatched.addEventListener("click", () => {
    addLocalStorageWached("watchedLocalStorage", movie.id);
  });

  modalButtonQueue.addEventListener("click", () => {
    addLocalStorageQueue("queueLocalStorage", movie.id);
  });
}