import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import Toolbar from '../Components/ComparisonToolbar/ComparisonToolbar';
import ComparisonTable from '../Components/ComparisonTable/ComparisonTable';
import './ReportsPage.css';

const UyumTakibiPage = () => {
  const [month, setMonth] = useState('8');
  const [year, setYear] = useState('2024');
  const [revision1, setRevision1] = useState('');
  const [revision2, setRevision2] = useState('');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7032/api/Reports', {
          params: {
            revOneId: revision1,
            revTwoId: revision2,
            month: month,
            year: year // Yıl parametresini ekleyin
          }
        });
        setTableData(response.data.map(item => ({
          factory: item.factoryName,
          product: item.productName,
          rev1: item.reviseOne,
          rev2: item.reviseTwo,
          diff: item.difference,
          conformity: (item.consistencyCalculation / 100000).toFixed(2) // Örnek dönüşüm
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [month, year, revision1, revision2]); // Yıl da bağımlılıklara ekleyin

  const getRevisionLabel = (revision) => {
    switch (revision) {
      case -1: return 'Revizyon -1';
      case 0: return 'Revizyon 0';
      case 1: return 'Revizyon 1';
      case 2: return 'Revizyon 2';
      case 3: return 'Revizyon 3';
      default: return '';
    }
  };

  return (
    <div className="reports-page">
      <Navbar />
      <Toolbar
        month={month}
        setMonth={setMonth}
        year={year} // Yıl parametresini geçirin
        setYear={setYear}
        revision1={revision1}
        setRevision1={setRevision1}
        revision2={revision2}
        setRevision2={setRevision2}
      />
      <div className="tables-and-chart">
        <div className="table-container">
          <ComparisonTable
            title="UYUM TAKİBİ"
            data={tableData}
            rev1Label={getRevisionLabel(revision1)}
            rev2Label={getRevisionLabel(revision2)}
          />
        </div>
      </div>
    </div>
  );
};

export default UyumTakibiPage;
