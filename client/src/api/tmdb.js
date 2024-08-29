import axios from 'axios';

const API_KEY = '1f7b5dbb909b6a79590cc44a13ce7214';
const BASE_URL = 'https://api.themoviedb.org/3';
const LOCAL_API_URL = 'http://localhost:7001/getflix/api/movies/search';

export const searchMovies = async (query, isLoggedIn) => {
  const url = isLoggedIn
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    : `${LOCAL_API_URL}?searchText=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
};
