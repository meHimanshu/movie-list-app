import React, { useState } from 'react';
import { Container, Typography, MenuItem, FormControl, Select, Button } from '@material-ui/core';
import ChartDisplay from '../components/ChartDisplay';
import { fetchAndAggregateData } from '../api/aggregator';
import LinearIndeterminate from '../components/Loader';
import './ChartsModule.scss';

const ChartsModule = () => {
  const [aggregationType, setAggregationType] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setAggregationType(event.target.value);
  };

  const handleAggregate = async () => {
    setLoading(true);
    const aggregatedData = await fetchAndAggregateData(aggregationType);
    setData(aggregatedData);
    setLoading(false);
  };

  return (
    <div className="chartsModuleContainer">
      <Container className="chartsContainer">
        <Typography variant="h6" gutterBottom>Select Data Aggregation</Typography>
        <FormControl fullWidth className="formControl">
          <Select value={aggregationType} onChange={handleChange}>
            <MenuItem value="moviesPerYear">Movies Per Year</MenuItem>
            <MenuItem value="averageRatingsPerGenre">Average Ratings Per Genre</MenuItem>
            <MenuItem value="mostPopularDirectors">Most Popular Directors</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAggregate} disabled={!aggregationType} className="button">
          Aggregate Data
        </Button>
        {loading && <LinearIndeterminate />} 
        {data.length > 0 && <ChartDisplay data={data} chartType={aggregationType} />}
      </Container>
    </div>
  );
};

export default ChartsModule;
