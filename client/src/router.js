import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MovieSearch from './modules/MovieSearch';
import MovieList from './modules/MovieList';
import Login from './modules/Login';
import ChartsModule from './modules/ChartsModule';
import Navbar from './components/Navbar';

const AppRouter = () => {
  return (
    <Router>
      <Route path={['/movies', '/charts']} component={Navbar} />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/search" component={MovieSearch} />
        <Route path="/movies" component={MovieList} />
        <Route path="/charts" component={ChartsModule} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
