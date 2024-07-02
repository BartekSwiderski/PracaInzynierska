import {
  moddalWind,
  moddalWind2,
  imgURL,
  imgPlaceholder,
  modal,
  modal2,
  paginationBox,
  spinner,
  HeadTitle,
  gal,
  timeout,
  GenreList,
  RegionList,
  LanguageList,
} from "./utils.js";
import { genresID, regionID, languageID } from "./genresID.js";
import { AddData, guid } from "./database.js";

export function toggleModal() {
  modal.classList.toggle("is-hidden");
}
export let totalPages = 0;
export function escape() {
  while (moddalWind.firstChild) {
    moddalWind.firstChild.remove();
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      while (moddalWind.firstChild) {
        moddalWind.firstChild.remove();
      }
      modal.classList.add("is-hidden");
    }
  });
}

export function escape2() {
  while (moddalWind2.firstChild) {
    moddalWind2.firstChild.remove();
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      while (moddalWind2.firstChild) {
        moddalWind2.firstChild.remove();
      }
      modal2.classList.add("is-hidden");
    }
  });
}

export function selectId(event) {
  const id = event.target.id;
  return id;
}

export async function fetchMovies(id) {
  try {
    await spinner.removeAttribute("hidden");
    await timeout(300);
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=837f028f22fd2591f3672c74a92683e2&language=en-US`
    );
    await spinner.setAttribute("hidden", "");
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
}
export function RenderAdvSearch() {
  let markupSec = ``;
  let markupSec2 = ``;
  let markupSec3 = ``;
  genresID.forEach((element) => {
    markupSec += `<option value="${element.id}">${element.name}</option>`;
  });
  regionID.forEach((element) => {
    markupSec2 += `<option value="${element.iso_3166_1}">${element.english_name}</option>`;
  });
  languageID.forEach((element) => {
    markupSec3 += `<option value="${element.iso_639_1}">${element.english_name}</option>`;
  });
  GenreList.insertAdjacentHTML("beforeend", markupSec);
  RegionList.insertAdjacentHTML("beforeend", markupSec2);
  LanguageList.insertAdjacentHTML("beforeend", markupSec3);
}

export async function renderModal(movie) {
  let markupSec = "";
  const {
    poster_path,
    genres,
    vote_average,
    vote_count,
    popularity,
    original_language,
    original_title,
    overview,
  } = movie;
  let gen = genres.map((genre) => genre.name).join(", ");
  if (poster_path == null) {
    markupSec = `
  <img class="moddal__poster" src="${imgPlaceholder}" alt="plakat" />
  <div>
  <h1 class="moddal__title">${original_title}</h1>
  <div class="moddal__data"><p class="moddal__dataTitle moddal__data--1">Vote / Votes</p><div class="moddal__data"><p class="moddal__dataTxt moddal__voteA">${vote_average}</p>/<p class="moddal__dataTxt moddal__voteC">${vote_count}</p></div></div>
  <div class="moddal__data"><p class="moddal__dataTitle moddal__data--2">Popularity</p><p class="moddal__dataTxt">${popularity}</p></div>
  <div class="moddal__data"><p class="moddal__dataTitle moddal__data--3">Original Title</p><p class="moddal__dataTxt">${original_title}</p></div>
  <div class="moddal__data"><p class="moddal__dataTitle moddal__data--5">Original Language</p><p class="moddal__dataTxt">${original_language}</p></div>
  <div class="moddal__data"><p class="moddal__dataTitle moddal__data--4">Genre</p><p class="moddal__dataTxt">${gen}</p></div>
  <h2 class="moddal__about">ABOUT</h2>
  <h3 class="moddal__aboutTxt">${overview}</h3>
  <div class="moddal__buttons"><button class="moddal__btn" watched>add to Watched</button><button class="moddal__btn" queue>add to queue</button></div>
  </div>`;
  } else {
    markupSec = `
<img class="moddal__poster" src="${imgURL}${poster_path}" alt="plakat" />
<div>
<h1 class="moddal__title">${original_title}</h1>
<div class="moddal__data"><p class="moddal__dataTitle moddal__data--1">Vote / Votes</p><div class="moddal__data"><p class="moddal__dataTxt moddal__voteA">${vote_average}</p>/<p class="moddal__dataTxt moddal__voteC">${vote_count}</p></div></div>
<div class="moddal__data"><p class="moddal__dataTitle moddal__data--2">Popularity</p><p class="moddal__dataTxt">${popularity}</p></div>
<div class="moddal__data"><p class="moddal__dataTitle moddal__data--3">Original Title</p><p class="moddal__dataTxt">${original_title}</p></div>
<div class="moddal__data"><p class="moddal__dataTitle moddal__data--5">Original Language</p><p class="moddal__dataTxt">${original_language}</p></div>
<div class="moddal__data"><p class="moddal__dataTitle moddal__data--4">Genre</p><p class="moddal__dataTxt">${gen}</p></div>
<h2 class="moddal__about">ABOUT</h2>
<h3 class="moddal__aboutTxt">${overview}</h3>
<div class="moddal__buttons"><button class="moddal__btn" watched>add to Watched</button><button class="moddal__btn" queue>add to queue</button></div>
</div>`;
  }
  moddalWind.insertAdjacentHTML("beforeend", markupSec);

  const modalButtonWatched = document.querySelector("button[watched]");
  const modalButtonQueue = document.querySelector("button[queue]");

  modalButtonWatched.addEventListener("click", () => {
    AddData("Watched", movie.id, guid);
  });

  modalButtonQueue.addEventListener("click", () => {
    AddData("Queue", movie.id, guid);
  });
}
function renderAdvancedSearchMovies(movies) {
  let markup = "";
  modal2.classList.toggle("is-hidden");

  movies;
  for (const {
    id,
    poster_path,
    original_title,
    genre_ids,
    release_date,
  } of movies) {
    let genre = genresID
      .filter((genre) => genre_ids.includes(genre.id))
      .map((genre) => genre.name)
      .slice(0, 3)
      .join(", ");
    HeadTitle.innerHTML = `Movies found for the <span class="gallery__searchName">Advanced Search</span>`;
    let date = release_date.split("-");
    let year = date[0];
    if (poster_path == null) {
      markup += `
<div>
<img class="gallery__image" id="${id}" src="${imgPlaceholder}" alt="plakat" />
<h3 class="gallery__title">${original_title}</h3>
<div class="gallery__decr"><p class="gallery__genre">${genre}</p><p class="gallery__date">${year}</p></div>
</div>`;
    } else {
      markup += `
<div>
<img class="gallery__image" id="${id}" src="${imgURL}${poster_path}" alt="plakat" />
<h3 class="gallery__title">${original_title}</h3>
<div class="gallery__decr"><p class="gallery__genre">${genre}</p><p class="gallery__date">${year}</p></div>
</div>`;
    }
  }
  console.log(markup);
  document.getElementById("gallery").innerHTML = "";
  gal.insertAdjacentHTML("beforeend", markup);
}
document
  .getElementById("MyForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let genre = document.getElementById("genre").value;
    let reg = document.getElementById("region").value;
    let lang = document.getElementById("language").value;
    let FetchLink = `https://api.themoviedb.org/3/discover/movie?api_key=837f028f22fd2591f3672c74a92683e2&include_adult=false&include_video=false&sort_by=popularity.desc&page=1`;
    if (genre != "null") {
      FetchLink += `&with_genres=${genre}`;
    }
    if (reg != "null") {
      FetchLink += `&with_origin_country=${reg}`;
    }
    if (lang != "null") {
      FetchLink += `&with_original_language=${lang}`;
    }
    console.log(FetchLink);

    try {
      const response = await fetch(`${FetchLink}`);
      let data = await response.json();

      let movies = await data.results;

      if (movies.length > 0) {
        renderAdvancedSearchMovies(movies);
        paginationBox.style.display = "none";
      } else {
        setPopularMovie();
      }
    } catch (err) {
      return console.log(err);
    }
  });
