/* import { watchedMovie, queueMovie } from "./utils.js"; */
import {gal, imgURL, imgPlaceholder, watchedMovie, queueMovie,moddalWind} from "./utils.js";
import { openModalBtn,closeModalBtn,modal} from "./utils.js";
import {toggleModal, escape, selectId, renderModal} from "./modalLibrary.js"
//Get data from LocalStorage
const storage = (key) => {
    const memory = localStorage.getItem(key);
    try {
        const saved = JSON.parse(memory);
        return saved;
    } catch (error) {
        console.log(error.message);
    }
};

//fetch movies
async function fetchMovies(id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=837f028f22fd2591f3672c74a92683e2&language=en-US`,
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (err) {
    return console.log(err);
    }
};
  
function renderMovies(movies) {
  let markup = "";
    const {
        id,
        poster_path,
        original_title,
        genre_ids,
        release_date,
        genres,
    } = movies;
    let genre = genres.map(genre => genre.name).join(", ")
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
  
  gal.insertAdjacentHTML("beforeend", markup);
}

//main function
queueMovie.onclick = async function renderQ() {
  while(gal.firstChild){gal.firstChild.remove()};
    let saved = storage("queueLocalStorage");
    for (const i of saved) {
        const movie = await fetchMovies(i);
        renderMovies(movie);
    }
}

watchedMovie.onclick = async function renderW() {
  while(gal.firstChild){gal.firstChild.remove()};
  let saved = storage("watchedLocalStorage");
  for (const i of saved) {
      const movie = await fetchMovies(i);
      renderMovies(movie);
  }
}
closeModalBtn.addEventListener("click", () => {while(moddalWind.firstChild){moddalWind.firstChild.remove()};
  toggleModal()});
modal.addEventListener("click", escape());

openModalBtn.addEventListener("click", async (event)=>{
  let id = await selectId(event);
  let movie = await fetchMovies(id);
  renderModal(movie);
  toggleModal()
});