import {
  totalPages,
  setPopularMovie,
  setSearchMovie,
  name,
} from "./renderMovies.js";
import { paginationBox, gal } from "./utils.js";
export let page = 1;
let FirstPage = 1;
export function setPage(value) {
  page = value;
}

let pagesListBegin = [`${page}`, `${page + 1}`, `${page + 2}`];
let setActive;

let hide = `<li class="page-item disabled hide" style="font-size:12px">
              <a class="page-link" href="#">&bull;&bull;&bull;</a>      
            </li>`;
export function renderPagination() {
  let pageFirst = ` <li class="page-item hide page-click" data=${FirstPage}>
                    <a class="page-link" href="#">${FirstPage}</a>      
                  </li>`;
  let leftArrow = ` <li class="page-item page-click" data=${page - 1}>
                  <a class="page-link arrow" href="#" tabindex="-1">   
                    <svg class="page-icon" width="16" height="16">
             <use href="./images/arrows.svg#icon-arrow-left"></use>
           </svg></a>
                </li>`;
  let rightArrow = ` <li class="page-item page-click" data=${page + 1}>
                  <a class="page-link arrow" href="#">
                   <svg class="page-icon" width="16" height="16">
             <use href="./images/arrows.svg#icon-arrow-right"></use>
          </svg>
                  </a>
                </li>`;
  let startMarkup = null;

  let pageLast = `<li class="page-item page-click hide" data=${totalPages}>
                  <a class="page-link" href="#">${totalPages}</a>
                </li>`;

  const markup = () => {
    startMarkup = pagesListBegin.map((item) => {
      return `<li class="page-item page-click" data=${item}>
      <a class="page-link" href="#">${item}</a>
      </li>`;
    });
  };

  if (totalPages < 2) {
    pagesListBegin = [`${page}`];
    markup();
    paginationBox.innerHTML = `
    ${startMarkup.join(" ")}
    `;
  } else if (totalPages > 1 && totalPages <= 3) {
    pagesListBegin = [`${page}`, `${page + 1}`, `${page + 2}`];
    markup();
    paginationBox.innerHTML = `
    ${startMarkup.join(" ")}${rightArrow}
    `;
  } else if (page === totalPages) {
    pagesListBegin = [`${page - 2}`, `${page - 1}`, `${page}`];
    markup();
    paginationBox.innerHTML = `
    ${leftArrow}${pageFirst}${hide}${startMarkup.join(" ")}
    `;
  } else if (page == totalPages - 1) {
    pagesListBegin = [`${page - 1}`, `${page}`, `${page + 1}`];
    markup();
    paginationBox.innerHTML = `
    ${leftArrow}${pageFirst}${hide}${startMarkup.join(" ")}${rightArrow}
    `;
  } else if (page == totalPages - 2) {
    pagesListBegin = [`${page - 1}`, `${page}`, `${page + 1}`, `${page + 2}`];
    markup();
    paginationBox.innerHTML = `
    ${leftArrow}${pageFirst}${hide}${startMarkup.join(" ")}${rightArrow}
    `;
  } else if (page == totalPages - 3) {
    pagesListBegin = [
      `${page - 1}`,
      `${page}`,
      `${page + 1}`,
      `${page + 2}`,
      `${page + 3}`,
    ];
    markup();
    paginationBox.innerHTML = `
    ${leftArrow}${pageFirst}${hide}${startMarkup.join(" ")}${rightArrow}
    `;
  } else if (page === 1) {
    pagesListBegin = [`${page}`, `${page + 1}`, `${page + 2}`];
    markup();
    paginationBox.innerHTML = `
    ${startMarkup.join(" ")}${hide}${pageLast}${rightArrow}
    `;
  } else if (page > 1 && page <= 2) {
    pagesListBegin = [`${page - 1}`, `${page}`, `${page + 1}`];
    markup();
    paginationBox.innerHTML = `
    ${leftArrow}${startMarkup.join(" ")}${hide}${pageLast}${rightArrow}
    `;
  } else if (page === 4) {
    pagesListBegin = [
      `${page - 3}`,
      `${page - 2}`,
      `${page - 1}`,
      `${page}`,
      `${page + 1}`,
    ];
    markup();
    paginationBox.innerHTML = `
    ${leftArrow}${startMarkup.join(" ")}${hide}${pageLast}${rightArrow}
    `;
  } else if (page < 4) {
    pagesListBegin = [`${page - 2}`, `${page - 1}`, `${page}`, `${page + 1}`];
    markup();
    paginationBox.innerHTML = `
    ${leftArrow}${startMarkup.join(" ")}${hide}${pageLast}${rightArrow}
    `;
  } else if (page >= 4) {
    pagesListBegin = [
      `${page - 2}`,
      `${page - 1}`,
      `${page}`,
      `${page + 1}`,
      `${page + 2}`,
    ];
    markup();
    paginationBox.innerHTML = `
    ${leftArrow}${pageFirst}${hide}${startMarkup.join(
      " "
    )}${hide}${pageLast}${rightArrow}
    `;
  }
  setActive = document.querySelector(`[data="${page}"]`);
  setActive.classList.add("active");
}

let currentPageNr = 0;
export const nextPage = (e) => {
  while (gal.firstChild) {
    gal.firstChild.remove();
  }
  currentPageNr = e.target.closest("li");
  page = parseInt(currentPageNr.getAttribute("data"));
  if (name == "") {
    setPopularMovie();
  } else setSearchMovie();
};
export function pageOne() {
  page = 1;
}
