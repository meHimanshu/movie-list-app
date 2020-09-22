import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, Typography, Button, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar(props) {
  const { setOpenModal, setLoggedIn, loggedIn } = props;

  const classes = useStyles();
  const logout = () => {
    setLoggedIn(false);
    localStorage.clear()
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Movie List App
          </Typography>
          {loggedIn?
            <Button color="inherit" onClick={logout}>
            Logout
            </Button>:
            <Tooltip title="Username=admin,Password=admin">
            <Button color="inherit" onClick={() => setOpenModal(true)}>
              Login
          </Button>
          </Tooltip>}
        </Toolbar>
      </AppBar>
    </div>
  );
}