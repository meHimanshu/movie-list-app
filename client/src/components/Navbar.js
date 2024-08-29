import React, { useContext } from 'react';
import { Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BarChartIcon from '@material-ui/icons/BarChart';
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000', // Black background
    padding: theme.spacing(2),
    position: 'relative',
    overflow: 'hidden',
  },
  title: {
    color: 'red', // Red text color
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 'xxx-large'

  },
  logoutButton: {
    color: 'red', // Red icon color
    position: 'absolute',
    right: theme.spacing(2),
  },
  chartButton: {
    color: 'red', // Red icon color
    position: 'absolute',
    left: theme.spacing(2),
  },
  searchButton: {
    color: 'red', // Red icon color
    position: 'absolute',
    left: theme.spacing(8),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  const handleChartNavigation = () => {
    history.push('/charts');
  };

  const handleChartSearch = () => {
    history.push('/search');
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        GETFLIX
      </Typography>
      <IconButton onClick={handleChartNavigation} className={classes.chartButton}>
          <BarChartIcon />
      </IconButton>
      <IconButton onClick={handleChartSearch} className={classes.searchButton}>
          <SearchIcon />
      </IconButton>
      <IconButton onClick={handleLogout} className={classes.logoutButton}>
        <ExitToAppIcon />
      </IconButton>
    </div>
  );
};

export default Navbar;
