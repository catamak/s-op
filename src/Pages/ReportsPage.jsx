import React, { useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Toolbar from '../Components/ComparisonToolbar/ComparisonToolbar';
import ComparisonTable from '../Components/ComparisonTable/ComparisonTable';
import ComparisonChart from '../Components/ComparisonChart/ComparisonChart';
import './ReportsPage.css';

const ReportsPage = () => {
  const [month, setMonth] = useState('');
  const [revision1, setRevision1] = useState('');
  const [revision2, setRevision2] = useState('');

  // Tablo verilerini güncelleme
  const getTableData = () => {
    // Revizyon değerlerine göre tabloyu dinamik olarak güncelleyin
    return [
      { factory: 'PVC', product: 'S23/59', rev1: revision1 || 22, rev2: revision2 || 15, diff: 17.5, conformity: 84.1 },
      // Diğer veri satırlarını güncelleyin
    ];
  };

  // Grafik verilerini güncelleme
  const getChartData = () => {
    // Revizyon değerlerine göre grafik verilerini güncelleyin
    return {
      labels: ['Uyum 1', 'Uyum 2', 'Uyum 3', 'Uyum 4', 'Uyum 5', 'Uyum 6'],
      datasets: [
        {
          label: 'PVC',
          data: [85, 88, 89, 91, 92, 90], // Dinamik verilerle güncelleyin
          borderColor: 'blue',
          fill: false,
        },
        {
          label: 'AYPE',
          data: [97, 97, 97, 97, 97, 97], // Dinamik verilerle güncelleyin
          borderColor: 'red',
          fill: false,
        },
        // Diğer veri setlerini dinamik olarak güncelleyin
      ],
    };
  };

  // Özet tablo verilerini güncelleme
  const getSummaryTableData = () => {
    // Revizyon değerlerine göre özet tabloyu dinamik olarak güncelleyin
    return [
      { factory: 'AYPE', conformity: [97, 97, 97, 97, 97, 97, 97] },
      // Diğer veri satırlarını dinamik olarak güncelleyin
    ];
  };

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
        <div className="table-container">
          <ComparisonTable title="UYUM TAKİBİ" data={getTableData()} />
        </div>
        <div className="chart-and-summary-container">
          <div className="summary-table-container">
            <h2>UYUM ÇİZELGESİ</h2>
            <ComparisonChart title="UYUM ÇİZELGESİ" data={getChartData()} />
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
                {getSummaryTableData().map((row, index) => (
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
    </div>
  );
};

export default ReportsPage;
