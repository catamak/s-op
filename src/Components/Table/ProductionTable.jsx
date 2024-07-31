import React, { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import './ProductionTable.css';

const ProductionTable = ({ revision, month, year }) => {
  const [data, setData] = useState([]);
  const [dropdownData] = useState(['', 'S23/59', 'S27R/63', 'S39/71', 'S65R/68', 'D']);
  const dropdownValues = {
    'S23/59': 115,
    'S27R/63': 120,
    'S39/71': 125,
    'S65R/68': 110,
    'D': 0
  };

  const dropdownColors = {
    'S23/59': '#FFA500', // Orange
    'S27R/63': '#FFC0CB', // Pink
    'S39/71': '#ADD8E6', // Light Blue
    'S65R/68': '#ADFF2F', // Green Yellow
    'D': '#00ff37' // Light Gray
  };

  useEffect(() => {
    if (month && year) {
      const daysInMonth = new Date(year, month, 0).getDate();
      const newData = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month - 1, day);
        const dayName = currentDate.toLocaleDateString('tr-TR', { weekday: 'long' });
        const formattedDate = currentDate.toLocaleDateString('tr-TR');
        newData.push([dayName, formattedDate, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
      }

      setData(newData);
    }
  }, [revision, month, year]);

  const colHeaders = [
    'Gün', 'Tarih', '1.Hat', '2.Hat', '3.Hat', '4.Hat', '1.Hat', '2.Hat', 'AYPE-T', 'YYPE', 'PP1', 'PP2', 'PTA', 'PA', 'MB'
  ];

  const nestedHeaders = [
    [{ label: 'Takvim', colspan: 2 }, { label: 'PVC Fabrikası', colspan: 4 }, { label: 'AYPE Fabrikası', colspan: 2 }, 'AYPE-T', 'YYPE', { label: 'PP', colspan: 2 }, 'PTA', 'PA', 'MB'],
    ['Gün', 'Tarih', '1.Hat', '2.Hat', '3.Hat', '4.Hat', '1.Hat', '2.Hat', '', '', '1. Hat', '2. Hat', '', '', '']
  ];

  const columnSettings = [
    { data: 0, readOnly: true, width: 100 },
    { data: 1, readOnly: true, width: 100 },
    { data: 2, renderer: dropdownRenderer, width: 80 },
    { data: 3, renderer: dropdownRenderer, width: 80 },
    { data: 4, renderer: dropdownRenderer, width: 80 },
    { data: 5, renderer: dropdownRenderer, width: 80 },
    { data: 6, renderer: dropdownRenderer, width: 80 },
    { data: 7, renderer: dropdownRenderer, width: 80 },
    { data: 8, renderer: dropdownRenderer, width: 80 },
    { data: 9, renderer: dropdownRenderer, width: 80 },
    { data: 10, renderer: dropdownRenderer, width: 80 },
    { data: 11, renderer: dropdownRenderer, width: 80 },
    { data: 12, renderer: dropdownRenderer, width: 80 },
    { data: 13, renderer: dropdownRenderer, width: 80 },
    { data: 14, renderer: dropdownRenderer, width: 80 },
  ];

  function dropdownRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);

    const select = document.createElement('select');
    const input = document.createElement('input');

    input.type = 'text';
    input.value = dropdownValues[value] || '';
    input.style.width = '100%';
    input.style.border = 'none';
    input.style.height = '50%';
    input.style.backgroundColor = 'white';
    input.style.fontSize = '10px'; /* Yazı boyutu küçültülmüş */
    input.style.fontWeight = 'bold'; /* Yazı kalınlaştırılmış */

    select.style.width = '100%';
    select.style.height = '50%';
    select.value = value || '';
    select.style.fontSize = '10px'; /* Yazı boyutu küçültülmüş */
    select.style.fontWeight = 'bold'; /* Yazı kalınlaştırılmış */

    dropdownData.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.text = option;
      optionElement.style.backgroundColor = dropdownColors[option] || 'white';
      select.appendChild(optionElement);
    });

    select.onchange = function () {
      const selectedValue = this.value;
      input.value = dropdownValues[selectedValue] || '';
      instance.setDataAtCell(row, col, selectedValue);
      updateColumnValues(instance, col, selectedValue);
      select.style.backgroundColor = dropdownColors[selectedValue] || 'white';
      select.selectedIndex = dropdownData.indexOf(selectedValue);
    };

    if (dropdownColors[value]) {
      select.style.backgroundColor = dropdownColors[value];
    } else {
      select.style.backgroundColor = 'white';
    }
    select.selectedIndex = dropdownData.indexOf(value);

    td.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'dropdown-container';
    container.appendChild(select);
    container.appendChild(input);
    td.appendChild(container);
  }

  function inputRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);

    const input = document.createElement('input');
    input.type = 'text';
    input.value = value || '';
    input.style.width = '100%';
    input.style.border = 'none';
    input.style.height = '50%';
    input.style.backgroundColor = 'white';
    input.style.fontSize = '10px'; /* Yazı boyutu küçültülmüş */
    input.style.fontWeight = 'bold'; /* Yazı kalınlaştırılmış */

    input.onchange = function () {
      const newValue = this.value;
      instance.setDataAtCell(row, col, newValue);
      updateColumnValues(instance, col, newValue);
    };

    td.innerHTML = '';
    td.appendChild(input);
  }

  function updateColumnValues(instance, col, value) {
    const rowCount = instance.countRows();
    for (let row = 0; row < rowCount; row++) {
      if (instance.getDataAtCell(row, col) !== value) {
        instance.setDataAtCell(row, col, value);
        const cell = instance.getCell(row, col);
        const input = cell.querySelector('input');
        if (input) {
          input.value = value;
        }
      }
    }
  }

  return (
    <div className="production-table">
      <HotTable
        data={data}
        colHeaders={colHeaders}
        nestedHeaders={nestedHeaders}
        rowHeaders={false}
        width="100%"
        height="auto"
        licenseKey="non-commercial-and-evaluation"
        columns={columnSettings}
        stretchH="all"
        className="handsontable"
      />
    </div>
  );
};

export default ProductionTable;
