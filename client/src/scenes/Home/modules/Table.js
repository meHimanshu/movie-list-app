import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, IconButton,
  TableContainer, TableHead, TableRow, Paper
} from "@material-ui/core";
import { AddShoppingCart } from '@material-ui/icons';


import data from "./data";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function SimpleTable(props) {
  const { loggedIn } = props;
  const classes = useStyles();

  return (
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
              {loggedIn  && <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCart />
              </IconButton>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}