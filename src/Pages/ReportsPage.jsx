import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import ComparisonToolbar from '../Components/ComparisonToolbar/ComparisonToolbar';
import ComparisonTable from '../Components/ComparisonTable/ComparisonTable';
import ComparisonChart from '../Components/ComparisonChart/ComparisonChart';
import './ReportsPage.css';

const ReportsPage = () => {
  const [month, setMonth] = useState(1); // Varsayılan olarak Ocak ayı
  const [year, setYear] = useState(2024); // Varsayılan olarak 2024 yılı
  const [revision1, setRevision1] = useState(-1); // Varsayılan olarak Revizyon -1
  const [revision2, setRevision2] = useState(0); // Varsayılan olarak Revizyon 0
  const [tableData, setTableData] = useState([]); // Tablo verilerini saklamak için
  const [chartData, setChartData] = useState([]); // Grafik verilerini saklamak için

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7032/api/Reports', {
          params: {
            revOneId: revision1,
            revTwoId: revision2,
            month: month,
            year: year
          }
        });

        console.log("API Yanıtı:", response.data); // Yanıtı kontrol edin
        setTableData(response.data); // Tablo verilerini güncelle
        setChartData(response.data); // Grafik verilerini güncelle
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, [revision1, revision2, month, year]); // Bağımlılıklar

  return (
    <div className="reports-page">
      <Navbar />
      <ComparisonToolbar
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        revision1={revision1}
        setRevision1={setRevision1}
        revision2={revision2}
        setRevision2={setRevision2}
      />
      <div className="tables-and-chart">
        <div className="table-container">
          <ComparisonTable title="UYUM TAKİBİ" data={tableData} />
        </div>
        <div className="chart-and-summary-container">
          <div className="summary-table-container">
            <h2>UYUM ÇİZELGESİ</h2>
            <ComparisonChart title="UYUM ÇİZELGESİ" data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
