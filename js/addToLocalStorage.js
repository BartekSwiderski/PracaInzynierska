// add movies to local storage
const addLocalStorageWached = (key, data) => {
  let savedMovie = localStorage.getItem("watchedLocalStorage");
  let isQueue = localStorage.getItem("queueLocalStorage")
  savedMovie = savedMovie ? JSON.parse(savedMovie) : [];
  isQueue = isQueue ? JSON.parse(isQueue) : [];
  // add new movie
  if(savedMovie.includes(data)){savedMovie=savedMovie}
  else {savedMovie.push(data);}
  if(isQueue.includes(data)){
    let index = isQueue.indexOf(data)
    if (index > -1){isQueue.splice(+index, 1);
    localStorage.removeItem("queueLocalStorage");
    localStorage.setItem("queueLocalStorage", JSON.stringify(isQueue));}
  }
  else{}
  localStorage.setItem("watchedLocalStorage", JSON.stringify(savedMovie));
};

const addLocalStorageQueue = (key, data) => {
  let savedMovie = localStorage.getItem("queueLocalStorage");
  let isWached = localStorage.getItem("watchedLocalStorage")
  savedMovie = savedMovie ? JSON.parse(savedMovie) : [];
  isWached = isWached ? JSON.parse(isWached) : [];
  // add new movie
  if(savedMovie.includes(data)){savedMovie=savedMovie}
  else {savedMovie.push(data);}
  if(isWached.includes(data)){
    let index = isWached.indexOf(data)
    if (index > -1){isWached.splice(+index, 1);
    localStorage.removeItem("watchedLocalStorage");
    localStorage.setItem("watchedLocalStorage", JSON.stringify(isWached));}
  }
  else{}

  localStorage.setItem("queueLocalStorage", JSON.stringify(savedMovie));
};

export { addLocalStorageQueue, addLocalStorageWached };