import React from 'react';
import { Container } from '@material-ui/core';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar
} from 'recharts';

const ChartDisplay = ({ data, chartType }) => {
  const renderChart = () => {
    switch (chartType) {
      case 'moviesPerYear':
        return (
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="movies" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        );
      case 'averageRatingsPerGenre':
        return (
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="genre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rating" fill="#8884d8" />
          </BarChart>
        );
      case 'mostPopularDirectors':
        return (
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="director" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="movies" fill="#8884d8" />
          </BarChart>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      {renderChart()}
    </Container>
  );
};

export default ChartDisplay;
