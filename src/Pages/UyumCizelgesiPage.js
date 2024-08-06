import React, { useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Toolbar from '../Components/ComparisonToolbar/ComparisonToolbar';
import ComparisonChart from '../Components/ComparisonChart/ComparisonChart';
import './ReportsPage.css';

const UyumCizelgesiPage = () => {
  const [month, setMonth] = useState('');
  const [revision1, setRevision1] = useState('');
  const [revision2, setRevision2] = useState('');

  const chartData = {
    labels: ['Uyum 1', 'Uyum 2', 'Uyum 3', 'Uyum 4', 'Uyum 5', 'Uyum 6'],
    datasets: [
      {
        label: 'PVC',
        data: [85, 88, 89, 91, 92, 90],
        borderColor: 'blue',
        fill: false,
      },
      // Diğer veri setleri...
    ],
  };

  const summaryTableData = [
    { factory: 'AYPE', conformity: [97, 97, 97, 97, 97, 97, 97] },
    { factory: 'AYPE-T', conformity: [96, 97, 98, 97, 95, 94, 96] },
    { factory: 'PP', conformity: [90, 91, 89, 88, 92, 93, 94] },
    { factory: 'YYPE', conformity: [85, 86, 87, 88, 89, 90, 91] },
    { factory: 'MB', conformity: [80, 81, 82, 83, 84, 85, 86] },
    { factory: 'PTA', conformity: [75, 76, 77, 78, 79, 80, 81] },
    { factory: 'PA', conformity: [70, 71, 72, 73, 74, 75, 76] }
  ];
  
      
  return (
    <div className="reports-page">
      <Navbar />
      <Toolbar
        month={month}
        setMonth={setMonth}
        revision1={revision1}
        setRevision1={setRevision1}
        revision2={revision2}
        setRevision2={setRevision2}
      />
      <div className="tables-and-chart">
        <div className="summary-table-container">
          <h2>UYUM ÇİZELGESİ</h2>
          <ComparisonChart title="UYUM ÇİZELGESİ" data={chartData} />
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
