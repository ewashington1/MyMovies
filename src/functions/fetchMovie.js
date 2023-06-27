import options from '../tmbd'

const fetchMovie = async (movieId) => {
    try {
      const fetchedMovie = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options);
      const movieData = await fetchedMovie.json();
      return movieData;
    } catch (err) {
      console.log(err);
    }
}

const fetchMovieForArray = async(movieId) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options);
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
      }
}

const searchResults = async(searchInput) => {
  try {
    const movies = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`, options)
    const data = await movies.json();
    return data;
  } catch (err) {
    console.log(err);
  }
  
}

export {fetchMovie, fetchMovieForArray, searchResults}