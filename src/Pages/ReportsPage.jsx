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
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  }); // Grafik verilerini saklamak için

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Requesting data with:', { revision1, revision2, month, year });
        const response = await axios.get('https://localhost:7032/api/Reports', {
          params: { 
            revOneId: revision1, 
            revTwoId: revision2, 
            month: month, 
            year: year 
          }
        });

        console.log("API Yanıtı:", response.data); // Yanıtı kontrol edin
        const fetchedTableData = response.data;

        if (fetchedTableData && Array.isArray(fetchedTableData)) {
          const factories = [...new Set(fetchedTableData.map(item => item.factoryName))];
          const labels = factories;
          const datasets = factories.map(factory => ({
            label: factory,
            data: fetchedTableData
              .filter(item => item.factoryName === factory)
              .map(item => item.conformityRate),
            borderColor: getColorByFactory(factory),
            backgroundColor: getColorByFactory(factory, 0.1),
            fill: true
          }));

          setTableData(fetchedTableData); // Tablo verilerini güncelle
          setChartData({ labels, datasets }); // Grafik verilerini güncelle
        } else {
          console.error('Unexpected data format:', fetchedTableData);
        }
      } catch (error) {
        if (error.response) {
          console.error('API Response Error:', error.response.data, 'Status Code:', error.response.status);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      }
    };

    fetchData();
  }, [revision1, revision2, month, year]); // Bağımlılıklar

  // Her fabrika için sabit bir renk belirlemek isterseniz:
  const getColorByFactory = (factory, opacity = 1) => {
    const colors = {
      'PVC': `rgba(0, 0, 255, ${opacity})`, // Mavi
      'AYPE': `rgba(255, 0, 0, ${opacity})`, // Kırmızı
      'AYPE-T': `rgba(0, 255, 0, ${opacity})`, // Yeşil
      'YYPE': `rgba(0, 255, 255, ${opacity})`, // Turkuaz
      'PP': `rgba(255, 192, 203, ${opacity})`, // Pembe
      'PTA': `rgba(255, 165, 0, ${opacity})`, // Turuncu
      'PA': `rgba(128, 0, 128, ${opacity})`, // Mor
      'MB': `rgba(255, 255, 0, ${opacity})` // Sarı
    };
    return colors[factory] || `rgba(0, 0, 0, ${opacity})`; // Bilinmeyen fabrikalar için siyah renk
  };

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
