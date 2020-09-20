import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell,
     TableContainer, TableHead, TableRow, Paper} from "@material-ui/core";

import data from "./data";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function SimpleTable() {
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

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}