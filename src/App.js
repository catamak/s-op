import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import './App.css'; // Özel stiller
import { generateCalendarData } from './calendarUtils';
import { customRenderer, colorRenderer } from './customRenderers'; // Custom renderers
import { afterChange } from './afterChangeHandler'; // afterChange fonksiyonu
import profileImage from './images/socar.png';
import Reports from './reports';
import ModalComponent from './ModalComponent';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function Home() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [calendarData, setCalendarData] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [revisionNumber, setRevisionNumber] = useState(1);
  const [revisionDate, setRevisionDate] = useState('01.15.2024'); // Başlangıç tarihi
  const [status, setStatus] = useState(''); // Durum bilgisini ekleyin
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false); // Görüşe yollama durumu
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
      console.log('Updated Data:', data);
      setCalendarData(data);
    }
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const handlePublishRevision = () => {
    if (isReviewSubmitted) {
      const newRevisionNumber = revisionNumber + 1;
      const today = new Date();
      const formattedDate = today.toLocaleDateString('tr-TR'); // Türkçe formatında tarih

      setRevisionNumber(newRevisionNumber);
      setRevisionDate(formattedDate);
      setStatus(''); // Durumu sıfırla
      setIsReviewSubmitted(false); // Görüşe yollama durumunu sıfırla
    }
  };

  const handleReviewSubmit = () => {
    setStatus('Görüş Bekleniyor'); // Durumu güncelle
    setIsReviewSubmitted(true); // Görüşe yollama durumunu işaretle
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <div className="user-profile">
            <img src={profileImage} alt="Profile" className="profile-image" />
            <div className="username">SOCAR Türkiye</div>
          </div>
          <div className="controls">
            <Link to="/" className="nav-button">Ana Sayfa</Link>
            <Link to="/reports" className="nav-button">Raporlar</Link>
            <button className="nav-button">Taslak Kaydet</button>
            <button className="nav-button" onClick={handleOpenReviewModal}>Görüşe Yolla</button>
            <button className="nav-button" onClick={handlePublishRevision}>Revizyonu Yayınla</button>
            <div className="dropdown-container">
              <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1, minWidth: 60 }}>
                <InputLabel id="month-select-label">Ay</InputLabel>
                <Select
                  labelId="month-select-label"
                  id="month-select"
                  value={selectedMonth}
                  label="Ay"
                  onChange={handleMonthChange}
                  sx={{ color: 'black', backgroundColor: 'white', fontSize: '0.8rem', height: '30px' }}
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
              <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: 1, minWidth: 60 }}>
                <InputLabel id="year-select-label">Yıl</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={selectedYear}
                  label="Yıl"
                  onChange={handleYearChange}
                  sx={{ color: 'black', backgroundColor: 'white', fontSize: '0.8rem', height: '30px' }}
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
          </div>
        </div>
        <div className="revision-info">
          <p>Durum: {status || ''}</p>
          <p>Revizyon No: {revisionNumber}</p>
          <p>Revizyon Tarihi: {revisionDate}</p>
        </div>
      </header>
      <div className="table-container">
        <HotTable
          ref={hotTableComponent}
          data={calendarData}
          colHeaders={false} // Sütun başlıklarını kaldır
          rowHeaders={false} // Satır başlıklarını kaldır
          mergeCells={[
            { row: 0, col: 2, rowspan: 1, colspan: 4 }, // PVC Fabrikası başlığı
            { row: 0, col: 6, rowspan: 1, colspan: 2 } // AYPE Fabrikası başlığı
          ]}
          afterChange={(changes, source) => {
            if (hotTableComponent.current) {
              afterChange(changes, source, hotTableComponent.current.hotInstance);
            }
          }}
          cells={(row, col) => {
            const cellProperties = {};
            if (row === 0 && (col === 2 || col === 6)) {
              cellProperties.renderer = (instance, td, row, col, prop, value, cellProperties) => {
                td.innerHTML = value;
                td.style.fontWeight = 'bold';
                td.style.textAlign = 'center';
                td.style.backgroundColor = '#f0f0f0';
              };
            } else if (row > 1 && col > 1) {
              cellProperties.renderer = customRenderer;
            } else if (row > 1) {
              cellProperties.renderer = colorRenderer;
            }
            return cellProperties;
          }}
          colWidths={Array(20).fill(100)} // 10 sütun için eşit genişlikler
          width="100%"
          height="100%"
          licenseKey="non-commercial-and-evaluation"
          stretchH="all"
        />
      </div>
      {isReviewModalOpen && (
        <ModalComponent
          modalIsOpen={isReviewModalOpen}
          closeModal={handleCloseReviewModal}
          onSubmit={handleReviewSubmit}
        />
      )}
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
