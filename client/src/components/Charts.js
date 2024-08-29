import React, { useState } from 'react';
import { Container, Typography, MenuItem, FormControl, Select, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChartDisplay from './ChartDisplay';
import { fetchAndAggregateData } from '../api/aggregator';

const useStyles = makeStyles((theme) => ({
  chartsContainer: {
    paddingTop: theme.spacing(2),
    backgroundColor: '#000', // Black background
    padding: theme.spacing(2),
    width: '100vw',
    height: 'calc(100vh - 64px)', // Full height minus navbar height
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
  },
}));

const Charts = () => {
  const classes = useStyles();
  const [aggregationType, setAggregationType] = useState('');
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setAggregationType(event.target.value);
  };

  const handleAggregate = async () => {
    const aggregatedData = await fetchAndAggregateData(aggregationType);
    setData(aggregatedData);
  };

  return (
    <Container className={classes.chartsContainer}>
      <Typography variant="h6" gutterBottom>Select Data Aggregation</Typography>
      <FormControl fullWidth>
        <Select value={aggregationType} onChange={handleChange}>
          <MenuItem value="moviesPerYear">Movies Per Year</MenuItem>
          <MenuItem value="averageRatingsPerGenre">Average Ratings Per Genre</MenuItem>
          <MenuItem value="mostPopularDirectors">Most Popular Directors</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleAggregate} disabled={!aggregationType}>
        Aggregate Data
      </Button>
      {data.length > 0 && <ChartDisplay data={data} chartType={aggregationType} />}
    </Container>
  );
};

export default Charts;
