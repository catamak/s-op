import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Navbar from '../Components/Navbar/Navbar';
import Toolbar from '../Components/ComparisonToolbar/ComparisonToolbar';
import './ReportsPage.css';

const UyumCizelgesiPage = () => {
  const [month, setMonth] = useState('8');
  const [year, setYear] = useState('2024');
  const [revision1, setRevision1] = useState('');
  const [revision2, setRevision2] = useState('');
  const [summaryTableData, setSummaryTableData] = useState(null); // Initialize as null to handle loading state

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/uyum-cizelgesi'); // Replace with your actual API endpoint
        const data = await response.json();
        setSummaryTableData(data); // Store fetched data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Uyum 1', 'Uyum 2', 'Uyum 3', 'Uyum 4', 'Uyum 5', 'Uyum 6'],
    datasets: [
      {
        label: 'PVC',
        data: [85, 88, 89, 91, 92, 90],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        fill: true,
      },
      // other datasets...
    ],
  };

  return (
    <div className="reports-page">
      <Navbar />
      <Toolbar
        month={month}
        setMonth={setMonth}
        year={year}
        setyear={setYear}
        revision1={revision1}
        setRevision1={setRevision1}
        revision2={revision2}
        setRevision2={setRevision2}
      />
      <div className="tables-and-chart">
        <div className="summary-table-container">
          <h2>UYUM ÇİZELGESİ</h2>
          <Line data={chartData} />
          {summaryTableData ? ( // Only render the table if data is available
            <table className="summary-table">
              <thead>
                <tr>
                  <th>FABRİKA</th>
                  <th>Uyum 0</th>
                  <th>Uyum 1</th>
                  <th>Uyum 2</th>
                  <th>Uyum 3</th>
                  <th>Uyum 4</th>
                  <th>Uyum 5</th>
                  <th>Uyum 6</th>
                </tr>
              </thead>
              <tbody>
                {summaryTableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.factory}</td>
                    {row.conformity.map((conformity, i) => (
                      <td key={i}>{conformity}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading data...</p> // Optional: display a loading message
          )}
        </div>
      </div>
    </div>
  );
};

export default UyumCizelgesiPage;
