import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';

const MovieDetailPopup = ({ open, onClose, movie }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{movie.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{movie.overview}</Typography>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: '100%' }} />
        <Typography variant="body2">Release Date: {movie.release_date}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieDetailPopup;
