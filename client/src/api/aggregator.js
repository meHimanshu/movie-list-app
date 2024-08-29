import axios from 'axios';

const API_KEY = '1f7b5dbb909b6a79590cc44a13ce7214';
const BASE_URL = 'https://api.themoviedb.org/3';
const MAX_RESULTS = 5000; 
const MAX_RESULT_TOTAL = 500000;
const CONCURRENT_REQUESTS = 5;
const MAX_PAGES = 100;
const RETRY_DELAY = 3000;


/**
 * Get the Aggregation Data for a given aggregationType
 * @param {*} aggregationType 
 * @returns 
 */
export const fetchAndAggregateData = async (aggregationType) => {
  switch (aggregationType) {
    case 'moviesPerYear':
      return aggregateMoviesPerYear();
    case 'averageRatingsPerGenre':
      return aggregateAverageRatingsPerGenre();
    case 'mostPopularDirectors':
      return aggregateMostPopularDirectors();
    default:
      return [];
  }
};

const fetchMoviesByPage = async (page) => {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        sort_by: 'release_date.asc',
        page: page,
      },
    });
    return response.data;
  };


const aggregateMoviesPerYear = async () => {
    // Fetch the first page to get the total number of pages
    const initialResponse = await fetchMoviesByPage(1);
  
    let totalResults = 0;
    const aggregation = {};
    let page = 1;
    const totalPages = Math.min(initialResponse.total_pages, 500);
  
    while (totalResults < MAX_RESULT_TOTAL && page <= totalPages) {
      const pagesToFetch = Math.min(CONCURRENT_REQUESTS, totalPages - page + 1);
  
      const fetchPromises = [];
      for (let i = 0; i < pagesToFetch; i++) {
        fetchPromises.push(fetchMoviesByPage(page + i));
      }
  
      const allResponses = await Promise.all(fetchPromises);
  
      allResponses.forEach(response => {
        response.results.forEach(movie => {
          const year = new Date(movie.release_date).getFullYear();
          if (aggregation[year]) {
            aggregation[year]++;
          } else {
            aggregation[year] = 1;
          }
        });
  
        totalResults += response.results.length;
      });
  
      page += pagesToFetch;
  
      if (totalResults >= MAX_RESULT_TOTAL) {
        break;
      }
    }
  
    return Object.entries(aggregation).map(([year, count]) => ({ year, movies: count }));
  };

// fetch by genre
  const fetchMoviesByGenre = async (genreId, page) => {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        sort_by: 'vote_average.desc',
        page: page,
      },
    });
    return response.data;
  };
  
  const aggregateAverageRatingsPerGenre = async () => {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    
    // get number of genres
    const genres = response.data.genres;
    const aggregation = {};
  
    for (const genre of genres) {

      // fetch the number of pages in genres
      const initialGenreResponse = await fetchMoviesByGenre(genre.id, 1);
      const totalPages = Math.min(initialGenreResponse.total_pages, MAX_PAGES);
  
      let totalResults = 0;
      let totalRating = 0;
      let page = 1;
  
      while (page <= totalPages) {
        const fetchPromises = [];
        for (let i = 0; i < CONCURRENT_REQUESTS && (page + i) <= totalPages; i++) {
          fetchPromises.push(fetchMoviesByGenre(genre.id, page + i));
        }
  
        const allResponses = await Promise.allSettled(fetchPromises);
  
        allResponses.forEach(result => {
          if (result.status === 'fulfilled') {
            const response = result.value;
            totalResults += response.results.length;
            totalRating += response.results.reduce((acc, movie) => acc + movie.vote_average, 0);
          } else {
            console.error(`Failed to fetch movies for genre ${genre.name} on page ${result.reason.config.params.page}`);
          }

        });
  
        page += CONCURRENT_REQUESTS;
      }
  
      const averageRating = totalResults > 0 ? totalRating / totalResults : 0;
      aggregation[genre.name] = averageRating;
    }
  
    return Object.entries(aggregation).map(([genre, rating]) => ({ genre, rating }));
  };



  const fetchMovieCredits = async (movieId) => {
    let response;
    let retries = 3;
    
    while (retries > 0) {
      try {
        response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
          params: {
            api_key: API_KEY,
          },
        });
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error(`Rate limit exceeded for movie ${movieId}, retrying in ${RETRY_DELAY / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          retries--;
        } else {
          throw error;
        }
      }
    }
    throw new Error(`Failed to fetch credits for movie ${movieId} after multiple retries.`);
  };
  
  const aggregateMostPopularDirectors = async () => {
    const initialResponse = await fetchMoviesByPage(1);
    const totalPages = Math.min(initialResponse.total_pages, MAX_PAGES);
  
    let page = 1;
    const movies = [];
  
    while (page <= totalPages) {
      const fetchPromises = [];
      for (let i = 0; i < CONCURRENT_REQUESTS; i++) {
        if (page + i <= totalPages) {
          fetchPromises.push(fetchMoviesByPage(page + i));
        }
      }
  
      const allResponses = await Promise.all(fetchPromises);
  
      allResponses.forEach(response => {
        movies.push(...response.results);
      });
  
      page += CONCURRENT_REQUESTS;
    }
  
    // Fetch movie credits concurrently for all movies
    const creditsPromises = movies.map(movie => fetchMovieCredits(movie.id));
    const allCredits = await Promise.all(creditsPromises);
  
    const aggregation = {};
  
    allCredits.forEach(response => {
      const directors = response.crew.filter(crew => crew.job === 'Director');
      directors.forEach(director => {
        if (aggregation[director.name]) {
          aggregation[director.name]++;
        } else {
          aggregation[director.name] = 1;
        }
      });
    });
  
    return Object.entries(aggregation).map(([director, movies]) => ({ director, movies }));
  };
  
