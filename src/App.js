import React, { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import './App.css'; // Özel stiller
import { generateCalendarData, getDayOfWeek } from './calendarUtils';
import { customRenderer, colorRenderer } from './customRenderers';
import { afterChange } from './afterChangeHandler';

function App() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const data = generateCalendarData(parseInt(selectedMonth), parseInt(selectedYear));
      setCalendarData(data);
    }
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="App">
      <div className="controls">
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
      <div className="table-container">
        <HotTable
          data={calendarData}
          colHeaders={true}
          rowHeaders={true}
          mergeCells={[
            { row: 0, col: 2, rowspan: 1, colspan: 4 },
            { row: 0, col: 6, rowspan: 1, colspan: 2 }
          ]}
          afterChange={afterChange(calendarData, setCalendarData)}
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
    </div>
  );
}

export default App;
