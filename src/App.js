import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import './App.css'; // Özel stiller
import { generateCalendarData } from './calendarUtils';
import { customRenderer, colorRenderer } from './customRenderers';
import { afterChange } from './afterChangeHandler';
import profileImage from './images/kadir.png';
import Reports from './reports';
import LoginModal from './LoginModal';

function Home() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [calendarData, setCalendarData] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const hotTableComponent = useRef(null); // Handsontable instance referansı

  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
    const data = generateCalendarData(currentMonth, currentYear);
    console.log('Generated Data:', data);
    setCalendarData(data);
  }, []);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const data = generateCalendarData(parseInt(selectedMonth), parseInt(selectedYear));
      console.log('Generated Data:', data);
      setCalendarData(data);
    }
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleProfileClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="App">
      <div className="header">
        <button className="user-profile" onClick={handleProfileClick}>
          <img src={profileImage} alt="Profile" className="profile-image" />
          <div className="username">Kadir Çatamak</div>
        </button>
        <div className="controls">
          <Link to="/" className="nav-button">Ana Sayfa</Link>
          <Link to="/reports" className="nav-button">Raporlar</Link>
          <div className="dropdown-container">
            <select value={selectedMonth} onChange={handleMonthChange}>
              <option value="">Ay seçiniz</option>
              <option value="1">Ocak</option>
              <option value="2">Şubat</option>
              <option value="3">Mart</option>
              <option value="4">Nisan</option>
              <option value="5">Mayıs</option>
              <option value="6">Haziran</option>
              <option value="7">Temmuz</option>
              <option value="8">Ağustos</option>
              <option value="9">Eylül</option>
              <option value="10">Ekim</option>
              <option value="11">Kasım</option>
              <option value="12">Aralık</option>
            </select>
            <select value={selectedYear} onChange={handleYearChange}>
              <option value="">Yıl seçiniz</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
          <div className="button-group">
            <button>Taslak Kaydet</button>
            <button>Görüşe Yolla</button>
            <button>Revizyonu Yayınla</button>
          </div>
        </div>
      </div>
      <div className="table-container">
        <HotTable
          ref={hotTableComponent}
          data={calendarData}
          colHeaders={true}
          rowHeaders={true}
          mergeCells={[
            { row: 0, col: 2, rowspan: 1, colspan: 4 },
            { row: 0, col: 6, rowspan: 1, colspan: 2 }
          ]}
          afterChange={(changes, source) => {
            if (hotTableComponent.current) {
              afterChange(changes, source, hotTableComponent.current.hotInstance);
            }
          }}
          cells={(row, col) => {
            const cellProperties = {};
            if (row > 1 && col > 1) {
              cellProperties.renderer = customRenderer;
            } else if (row > 1) {
              cellProperties.renderer = colorRenderer;
            }
            return cellProperties;
          }}
          width="100%"
          height="100%"
          licenseKey="non-commercial-and-evaluation"
          stretchH="all"
        />
      </div>
      {isLoginModalOpen && <LoginModal onClose={handleCloseModal} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;