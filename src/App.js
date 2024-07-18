import React, { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import './App.css'; // Custom styles

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

  const generateCalendarData = (month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const calendarData = [
      ['Takvim', '', 'PVC Fabrikası', '', '', '', 'AYPE Fabrikası', '', '', '', '', '', '', ''],
      ['Gun', 'Tarih', '1.Hat', '2.Hat', '3.Hat', '4.Hat', '1.Hat', '2.Hat', 'AYPE-T', 'YYPE', 'PP', 'PTA', 'PA', 'MB']
    ];
  
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month - 1, i);
      const formattedDate = `${('0' + i).slice(-2)}.${('0' + month).slice(-2)}.${year}`;
      calendarData.push([getDayOfWeek(date.getDay()), formattedDate, '', '', '', '', '', '', '', '', '', '', '', '']);
    }

    return calendarData;
  };

  const getDayOfWeek = (dayIndex) => {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    return days[dayIndex];
  };

  const customRenderer = (instance, td, row, col, prop, value, cellProperties) => {
    const productionOptions = ['10', '20', '30', '40', '50'];
    
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    
    const select = document.createElement('select');
    select.className = 'htDropdownButton'; // CSS sınıfını ekleyin
    productionOptions.forEach(optionValue => {
      const option = document.createElement('option');
      option.value = optionValue;
      option.innerHTML = optionValue;
      if (value === optionValue) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    select.addEventListener('change', () => {
      instance.setDataAtCell(row, col, select.value);
    });
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    input.addEventListener('change', () => {
      instance.setDataAtCell(row, col, input.value);
    });

    container.appendChild(select);
    container.appendChild(input);
    
    td.innerHTML = '';
    td.appendChild(container);
    return td;
  };

  const colorRenderer = (instance, td, row, col, prop, value, cellProperties) => {
    const cellContent = document.createElement('div');
    cellContent.style.width = '100%';
    cellContent.style.height = '100%';

    if (value) {
      if (value.includes('S23')) {
        cellContent.style.backgroundColor = '#FFDDC1';
      } else if (value.includes('S65R')) {
        cellContent.style.backgroundColor = '#FFFF99';
      } else if (value.includes('S39')) {
        cellContent.style.backgroundColor = '#99CCFF';
      } else if (value.includes('G03')) {
        cellContent.style.backgroundColor = '#FFCCCC';
      } else if (value.includes('H5-21T')) {
        cellContent.style.backgroundColor = '#99FF99';
      } else if (value.includes('F00756')) {
        cellContent.style.backgroundColor = '#FFCC99';
      } else if (value.includes('MH180')) {
        cellContent.style.backgroundColor = '#FFFF66';
      } else if (value.includes('D')) {
        cellContent.style.backgroundColor = '#FF6666';
      } else if (value.includes('Ü')) {
        cellContent.style.backgroundColor = '#66FF66';
      }
    }

    cellContent.innerText = value || '';
    td.innerHTML = '';
    td.appendChild(cellContent);

    return td;
  };

  const afterChange = (changes, source) => {
    if (source === 'edit' || source === 'change') {
      const [row, col, oldValue, newValue] = changes[0];
      if (row > 1 && col > 1) {  // Only apply to data cells
        const updatedData = calendarData.map((rowData, rowIndex) => {
          if (rowIndex > row) { // Only change cells below the edited cell
            rowData[col] = newValue;
          }
          return rowData;
        });
        setCalendarData(updatedData);
      }
    }
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
          afterChange={afterChange}
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
