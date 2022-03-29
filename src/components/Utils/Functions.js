function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function saveMoviesToLocalStorage(movies) {
  localStorage.setItem("localMovies", JSON.stringify(movies));
}

function restoreMoviesFromLocalStorage() {
  let parsedList = JSON.parse(localStorage.getItem("localMovies"));
  if (parsedList !== null) {
    return parsedList;
  } else return [];
}
export { goToTop, saveMoviesToLocalStorage, restoreMoviesFromLocalStorage };
