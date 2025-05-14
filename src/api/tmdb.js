import axios from 'axios';

const API_KEY = 'a123a6f0c562f205c5955c33428120af'; // Replace with your real key
const BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = (query) => {
  return axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
    },
  });
};

export const getTrending = () => {
    return axios.get(`${BASE_URL}/trending/movie/week`, {
        params:{api_key:API_KEY}
    })
}

export const getPopular = (pageNumber = 1) => {
    return axios.get(`${BASE_URL}/movie/popular`, {
        params:{api_key:API_KEY,page:pageNumber}
    })
}

// get movie details
export const getMovieDetails = (id) =>
  axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

// get video trailers for a movie
export const getMovieVideos = (id) => 
  axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
