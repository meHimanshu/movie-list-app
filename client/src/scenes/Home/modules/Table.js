import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, IconButton, Box, InputBase,
  TableContainer, TableHead, TableRow, Paper
} from "@material-ui/core";
import { AddShoppingCart, Search } from '@material-ui/icons';
import MovieModal from "./MovieModel";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function SimpleTable(props) {
  const { loggedIn, setLoggedIn } = props;
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [addModal,setAddModal] = useState(false)
  const [selectedData, setSelectedData] = useState();
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    console.log("fetched data------------------");
    let result = await fetch(`http://localhost:7000/api/movies/list?searchText=${searchText}`);
    result = await result.json()
    if (result && result.data) {
      setData(result.data);
    }
  }


  const editMovie = (data, row) => {
    setSelectedData(row);
    setAddModal(true);
  }

  useEffect( () => {
    console.log("useEffect-----")
    fetchData();
  }, []);


  return (
    <Paper>
      <Box m={10}>
        <Box>
          {loggedIn && <IconButton aria-label="delete" onClick={() => setAddModal(true)} className={classes.margin} size="small">
            <AddShoppingCart fontSize="inherit" />
          </IconButton>}
          <Box ml={3} component="span">
            <InputBase
              className={classes.input}
              placeholder="Search"
              onChange={(event) => setSearchText(event.target.value)}
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton onClick={fetchData} className={classes.iconButton} aria-label="search">
              <Search />
            </IconButton>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell >Name</TableCell>
                <TableCell align="right">99popularity</TableCell>
                <TableCell align="right">Director</TableCell>
                <TableCell align="right">Genre</TableCell>
                <TableCell align="right">IMDB_SCORE</TableCell>
                {loggedIn && <TableCell align="right">Activity</TableCell>}

              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row["99popularity"]}</TableCell>
                  <TableCell align="right">{row.director}</TableCell>
                  <TableCell align="right">{row.genre}</TableCell>
                  <TableCell align="right">{row.imdb_score}</TableCell>
                  {loggedIn && <IconButton color="primary" key={row.name} onClick={(e) => editMovie(e, row)} aria-label="add to shopping cart">
                    <AddShoppingCart />
                  </IconButton>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {addModal && <MovieModal setSelectedData={setSelectedData} data={selectedData} setLoggedIn={setLoggedIn} setOpenModal={setAddModal}/>}
    </Paper>
  );
}