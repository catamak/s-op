import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './ComparisonChart.css';

const ComparisonChart = ({ data }) => {
  const options = {
    scales: {
      x: {
        type: 'category',
        labels: data.labels,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="comparison-chart-container">
      <Line data={data} options={options} />
      <div className="legend">
        {/* Add more legend items as needed */}
      </div>
    </div>
  );
};

export default ComparisonChart;
