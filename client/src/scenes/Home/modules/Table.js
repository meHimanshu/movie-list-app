import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, IconButton, Box, InputBase,Typography,
  TableContainer, TableHead, TableRow, Paper, Select, Chip, Input, MenuItem, Button
} from "@material-ui/core";
import { Edit, Search, AddBox, Delete } from '@material-ui/icons';
import MovieModal from "./MovieModel";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container:{
    maxHeight: 440
  }
});

const genres = ["Action", "Adventure", "Classic", "Comedy", "Romance", "Horror", "Thriller",
  "Drama", "Biopic", "Documentry", "Animation", "Fantasy"]

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

function compareValues(key) {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return comparison;
  };
}


export default function SimpleTable(props) {
  const { loggedIn, setLoggedIn } = props;
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [addModal, setAddModal] = useState(false)
  const [selectedData, setSelectedData] = useState();
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState([]);
  const [sortField, setSortField] = useState();

  const fetchData = async (data = {}) => {
    const { method, id, refetch, url, body} = data;
    const requestBody = body || { filter }
    const path = id ? id : `list?searchText=${searchText}`
    let result = await fetch(url || `http://localhost:7000/api/movies/${path}`,
      {
        method: method || 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...requestBody, isAuthenticated: loggedIn})
      });
    result = await result.json();
    setSortField();
    if (!refetch && result && result.data) {
      return setData(result.data);
    }
    if(refetch){
      fetchData();
    }
  }
  console.log("data0000000",data);

  const editMovie = (data, row) => {
    setSelectedData(row);
    setAddModal(true);
  }
  console.log("data",data,data.length);

  useEffect(() => {
    console.log("useEffect-----")
    fetchData();
  }, []);
  

  const handleSort = (event) => {
    setSortField(event.target.value);
    const sortedData = [...data.sort(compareValues(event.target.value))];
    setData(sortedData)
  }

  return (
      <Box m={10}>
        <Box>
          {loggedIn && <IconButton onClick={() => setAddModal(true)} className={classes.margin} size="small">
            <AddBox color="primary" />
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
          <Box component="span" ml={3}>
          <Typography display="inline" >Filter by genres: </Typography>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={filter}
              label={"genre"}
              onChange={(event) => setFilter(event.target.value)}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => {
                return <div >
                  {filter.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              }}
              MenuProps={MenuProps}
            >
              {genres.map((name) => (
                <MenuItem key={name} value={name} >
                  {name}
                </MenuItem>
              ))}
            </Select>
            <Button size="small" onClick={fetchData} variant="outlined" color="primary">Filter</Button>
          </Box>
          <Box component="span" ml={3}>
            {/* <InputLabel id="demo-simple-select-helper-label">Sort By:</InputLabel> */}
            <Typography display="inline" >Sort by: </Typography>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={sortField}
              onChange={handleSort}
            >
              <MenuItem value={"99popularity"}>99Popularity</MenuItem>
              <MenuItem value={"director"}>Director Name</MenuItem>
              <MenuItem value={"name"}>Movie Name</MenuItem>
            </Select>
          </Box>
        </Box>
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-label="simple table">
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
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row["99popularity"]}</TableCell>
                  <TableCell align="right">{row.director}</TableCell>
                  <TableCell align="right">{row.genre}</TableCell>
                  <TableCell align="right">{row.imdb_score}</TableCell>
                  {loggedIn && <Box display="flex">
                  <IconButton key={row._id} onClick={(e) => editMovie(e, row)} aria-label="add to shopping cart">
                    <Edit color="primary"/>
                  </IconButton>
                  <IconButton  key={row._id} onClick={(e) => fetchData({method:"DELETE",id:row._id, refetch:true})} aria-label="add to shopping cart">
                    <Delete color="secondary"/>
                  </IconButton>
                  </Box>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {addModal && <MovieModal fetchData={fetchData} setSelectedData={setSelectedData} data={selectedData} setLoggedIn={setLoggedIn} setOpenModal={setAddModal} />}
      </Box>
  );
}