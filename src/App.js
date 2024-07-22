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
import ModalComponent from './ModalComponent';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function Home() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [calendarData, setCalendarData] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
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

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  return (
    <div className="App">
      <div className="header">
        <button className="user-profile" onClick={handleProfileClick}>
          <img src={profileImage} alt="Profile" className="profile-image" />
          <div className="username">Kadir Çatamak</div>
        </button>
        <div className="controls">
          <Link to="/" className="nav-button nav-button-home">Ana Sayfa</Link>
          <Link to="/reports" className="nav-button">Raporlar</Link>
          <div className="dropdown-container">
            <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
              <InputLabel id="month-select-label">Ay</InputLabel>
              <Select
                labelId="month-select-label"
                id="month-select"
                value={selectedMonth}
                label="Ay"
                onChange={handleMonthChange}
                sx={{ color: 'black', backgroundColor: 'white' }}
              >
                <MenuItem value="">Ay seçiniz</MenuItem>
                <MenuItem value="1">Ocak</MenuItem>
                <MenuItem value="2">Şubat</MenuItem>
                <MenuItem value="3">Mart</MenuItem>
                <MenuItem value="4">Nisan</MenuItem>
                <MenuItem value="5">Mayıs</MenuItem>
                <MenuItem value="6">Haziran</MenuItem>
                <MenuItem value="7">Temmuz</MenuItem>
                <MenuItem value="8">Ağustos</MenuItem>
                <MenuItem value="9">Eylül</MenuItem>
                <MenuItem value="10">Ekim</MenuItem>
                <MenuItem value="11">Kasım</MenuItem>
                <MenuItem value="12">Aralık</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1 }}>
              <InputLabel id="year-select-label">Yıl</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={selectedYear}
                label="Yıl"
                onChange={handleYearChange}
                sx={{ color: 'black', backgroundColor: 'white' }}
              >
                <MenuItem value="">Yıl seçiniz</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2025">2025</MenuItem>
                <MenuItem value="2026">2026</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="button-group">
            <button className="nav-button">Taslak Kaydet</button>
            <button className="nav-button" onClick={handleOpenReviewModal}>Görüşe Yolla</button>
            <button className="nav-button">Revizyonu Yayınla</button>
          </div>
        </div>
      </div>
      <div className="table-container">
      <HotTable
  ref={hotTableComponent}
  data={calendarData}
  colHeaders={false} // Sütun başlıklarını kaldır
  rowHeaders={false} // Satır başlıklarını kaldır
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
      {isReviewModalOpen && <ModalComponent modalIsOpen={isReviewModalOpen} closeModal={handleCloseReviewModal} />}
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
