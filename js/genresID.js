export let genresID = [];
export let regionID = [];
export let languageID = [];

async function fetchGenres() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=837f028f22fd2591f3672c74a92683e2&language=en-US`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  } catch (err) {
    return console.log(err);
  }
}
async function createGenres() {
  const data = await fetchGenres();
  genresID = data.genres;
}
async function fetchRegions() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/configuration/countries?api_key=837f028f22fd2591f3672c74a92683e2&language=en-US`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  } catch (err) {
    return console.log(err);
  }
}
async function createRegions() {
  const data2 = await fetchRegions();
  regionID = data2;
}

async function fetchLanguage() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=837f028f22fd2591f3672c74a92683e2&sort_by=english_name.asc`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  } catch (err) {
    return console.log(err);
  }
}
async function createLanguage() {
  const data3 = await fetchLanguage();
  languageID = data3;
}
createGenres();
createRegions();
createLanguage();
