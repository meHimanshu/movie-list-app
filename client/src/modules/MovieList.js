import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, ImageList, ImageListItem, ImageListItemBar, ListSubheader, IconButton, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import LinearIndeterminate from '../components/Loader';
import MovieDetailPopup from '../components/MovieDetailPopup';
import defaultPoster from '../data/images/sholay.jpg';
import { searchMovies } from '../api/tmdb';
import './MovieList.scss';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MovieList = () => {
  const location = useLocation();
  const query = useQuery().get('query');
  const { isLoggedIn } = location.state || {};
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        try {
          setLoading(true);
          const results = await searchMovies(query, isLoggedIn);
          setMovies(results.results || results);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch movies', error);
          setLoading(false);
        }
      }
    };
    fetchMovies();
  }, [query, isLoggedIn]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSelectedMovie(null);
  };

  return (
    <Container className="rootList" maxWidth={false}>
      {loading && <LinearIndeterminate />}
      <div className="imageListContainer">
        <ImageList rowHeight={300} className="imageList" cols={4}>
          <ImageListItem key="Subheader" cols={4} style={{ height: 'auto' }}>
          </ImageListItem>
          {movies.map((movie) => (
            <ImageListItem key={movie.id} className="listItem" onClick={() => handleMovieClick(movie)}>
              <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultPoster} alt={movie.title} />
              <ImageListItemBar
                title={movie.title}
                subtitle={<span>{movie.release_date}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${movie.title}`} className="icon">
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      {selectedMovie && (
        <MovieDetailPopup
          open={openPopup}
          onClose={handleClosePopup}
          movie={selectedMovie}
        />
      )}
    </Container>
  );
};

export default MovieList;
