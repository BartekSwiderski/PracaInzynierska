const qs = (selector) => document.querySelector(selector);
export function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const indexError = qs(".headerIndex__error");
export const gal = qs(".gallery");
export const searchForm = qs("#search-form");
export const openModalBtn = qs("[data-modal-open]");
export const closeModalBtn = qs("[data-modal-close]");
export const closeModalBtn2 = qs("[data-modal-close2]");
export const modal = qs("[data-modal]");
export const modal2 = qs("[data-modal2]");
export const SearchModal = qs("[search-modal]");
export const moddalWind = qs(".moddal__grid");
export const moddalWind2 = qs(".moddal__grid2");
export const imgURL = "https://image.tmdb.org/t/p/w500";
export const imgPlaceholder =
  "https://fireteller.com/wp-content/uploads/2020/09/Poster_Not_Available2.jpg";
export const spinner = document.getElementById("spinner");
export const paginationBox = qs(".pagination");

export const inputHeader = qs(".headerIndex__search");
export const paginationItem =
  document.getElementsByClassName("pagination-item");
export const watchedMovie = document.querySelector("#btnW");
export const queueMovie = document.querySelector("#btnQ");
export const HeadTitle = document.getElementById("HeadTitle");
export const GenreList = document.getElementById("genre");
export const RegionList = document.getElementById("region");
export const LanguageList = document.getElementById("language");
export const SubmitAdvancedSearch = document.getElementById(
  "submitAdvancedSearch"
);
export const AdvancedSearch = document.getElementById("as");
