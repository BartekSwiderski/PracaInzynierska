export let genresID=[];
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
async function createGenres () {
  const data = await fetchGenres()
  genresID=data.genres
}
createGenres ();




