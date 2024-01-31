import {
  gal,
  imgURL,
  spinner,
  timeout,
  indexError,
  imgPlaceholder,
} from "./utils.js";
import { genresID } from "./genresID.js";
import { renderPagination, page } from "./pagination.js";
let markup = "";
indexError.style.display = "none";
export let totalPages = 0;
async function topMovie(page) {
  try {
    await spinner.removeAttribute("hidden");
    markup = "";
    await timeout(200);
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=837f028f22fd2591f3672c74a92683e2&page=${page}`
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
function renderMovies(movies) {
  totalPages = movies.total_pages;
  renderPagination();
  let movie = movies.results;
  for (const {
    id,
    poster_path,
    original_title,
    genre_ids,
    release_date,
  } of movie) {
    let genre = genresID
      .filter((genre) => genre_ids.includes(genre.id))
      .map((genre) => genre.name)
      .slice(0, 3)
      .join(", ");
    let date = release_date.split("-");
    let year = date[0];
    if (poster_path == null) {
    markup += `
     <div>
      <img class="gallery__image" id="${id}" src="${imgPlaceholder}" alt="plakat" />
      <h3 class="gallery__title">${original_title}</h3>
      <div class="gallery__decr"><p class="gallery__genre">${genre}</p><p class="gallery__date">${year}</p></div>
     </div>`;
    }
    else{ markup += `
    <div>
     <img class="gallery__image" id="${id}" src="${imgURL}${poster_path}" alt="plakat" />
     <h3 class="gallery__title">${original_title}</h3>
     <div class="gallery__decr"><p class="gallery__genre">${genre}</p><p class="gallery__date">${year}</p></div>
    </div>`;}
  }
  gal.insertAdjacentHTML("beforeend", markup);
}
export async function setPopularMovie() {
  let movies = await topMovie(page);
  renderMovies(movies);
}
async function fetchMovies() {
  try {
    await spinner.removeAttribute("hidden");
    await timeout(200);
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=837f028f22fd2591f3672c74a92683e2&language=en-US&query=${name}&page=1&include_adult=false&page=${page}`
    );
    await spinner.setAttribute("hidden", "");
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (err) {
    setPopularMovie();
    return console.log(err);
  }
}
export let name = "";
export async function eventHandler(event) {
  event.preventDefault();
  name = await event.currentTarget.elements.searchQuery.value;
  try {
    let data = await fetchMovies(name, page);
    totalPages = data.total_pages;
    let movies = data.results;
    if (movies.length > 0) {
      renderSerchMovies(movies);
      indexError.style.display = "none";
    } else {
      setPopularMovie();
      indexError.style.display = "block";
    }
  } catch (err) {
    return console.log(err);
  }
}
export function renderSerchMovies(movies) {
  renderPagination();
  let markup = "";
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
      .join(", ");
    let date = release_date?.split("-") ?? "";
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
  gal.insertAdjacentHTML("beforeend", markup);
}
export async function setSearchMovie() {
  let movi = await fetchMovies();
  let movies = await movi.results;
  renderSerchMovies(movies);
}
