import React, { useState } from 'react';
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
      {
        label: 'AYPE',
        data: [95, 92, 90, 93, 94, 92],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        fill: true,
      },
      {
        label: 'AYPE-T',
        data: [88, 86, 87, 85, 90, 92],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        fill: true,
      },
      {
        label: 'YYPE',
        data: [78, 79, 80, 83, 85, 87],
        borderColor: 'cyan',
        backgroundColor: 'rgba(0, 255, 255, 0.1)',
        fill: true,
      },
      {
        label: 'PP',
        data: [68, 70, 72, 74, 75, 78],
        borderColor: 'pink',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        fill: true,
      },
      {
        label: 'PTA',
        data: [55, 57, 60, 62, 65, 68],
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
        fill: true,
      },
      {
        label: 'PA',
        data: [48, 50, 52, 54, 55, 57],
        borderColor: 'purple',
        backgroundColor: 'rgba(128, 0, 128, 0.1)',
        fill: true,
      },
      {
        label: 'MB',
        data: [40, 42, 45, 48, 50, 52],
        borderColor: 'yellow',
        backgroundColor: 'rgba(165, 42, 42, 0.1)',
        fill: true,
      },
    ],
  };

  const summaryTableData = [
    { factory: 'AYPE', conformity: [97, 97, 97, 97, 97, 97, 97] },
    { factory: 'AYPE-T', conformity: [83, 83, 79, 62, 62, 62, 62] },
    { factory: 'MB', conformity: [94, 94, 94, 94, 94, 94, 94] },
    { factory: 'PA', conformity: [66, 66, 66, 66, 66, 66, 66] },
    { factory: 'PP', conformity: [55, 55, 55, 55, 55, 55, 55] },
    { factory: 'PTA', conformity: [77, 77, 77, 77, 77, 77, 77] },
    { factory: 'PVC', conformity: [67, 67, 67, 67, 67, 67, 67] },
  ];

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
        </div>
      </div>
    </div>
  );
};

export default UyumCizelgesiPage;
