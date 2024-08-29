import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@material-ui/core';
import { AuthContext } from '../context/AuthContext';

import './MovieSearch.scss';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const history = useHistory();
    const { isLoggedIn } = useContext(AuthContext);

    const searchMovies = (e) => {
        e.preventDefault();
        if (query) {
            history.push({
                pathname: '/movies',
                search: `?query=${query}`,
                state: { isLoggedIn: isLoggedIn()},
            });
        }
    };

    return (
        <div className="root">
            <Container maxWidth="sm" className="formContainer">
                <Typography variant="h4" gutterBottom className="title">
                    <span>GETFLIX</span> Movies
                </Typography>
                <form onSubmit={searchMovies}>
                    <TextField
                        variant="outlined"
                        label="Search for a movie"
                        fullWidth
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="input"
                    />
                    <Button variant="contained" type="submit" fullWidth className="button">
                        Search
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default MovieSearch;
