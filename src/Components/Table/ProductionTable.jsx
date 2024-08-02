import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import './ProductionTable.css';

const ProductionTable = React.memo(({ revision, month, year, updateTableData }) => {
  const [data, setData] = useState([]);
  const dropdownData = useMemo(() => ['', 'S23/59', 'S27R/63', 'S39/71', 'S65R/68', 'D'], []);
  
  const dropdownValues = useMemo(() => ({
    'S23/59': 115,
    'S27R/63': 120,
    'S39/71': 125,
    'S65R/68': 110,
    'D': 0
  }), []);
  
  const dropdownColors = useMemo(() => ({
    'S23/59': '#FFA500', // Orange
    'S27R/63': '#FFC0CB', // Pink
    'S39/71': '#ADD8E6', // Light Blue
    'S65R/68': '#ADFF2F', // Green Yellow
    'D': '#00ff37' // Light Gray
  }), []);

  useEffect(() => {
    if (month && year) {
      const daysInMonth = new Date(year, month, 0).getDate();
      const newData = Array.from({ length: daysInMonth }, (_, i) => {
        const currentDate = new Date(year, month - 1, i + 1);
        const dayName = currentDate.toLocaleDateString('tr-TR', { weekday: 'long' });
        const formattedDate = currentDate.toLocaleDateString('tr-TR');
        return [dayName, formattedDate, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
      });

      setData(newData);
    }
  }, [revision, month, year]);

  useEffect(() => {
    updateTableData(data);
  }, [data, updateTableData]);

  const dropdownRenderer = useCallback((instance, td, row, col, prop, value, cellProperties) => {
    Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);

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
      const newValue = dropdownValues[selectedValue] || '';
      instance.batch(() => {
        const rowCount = instance.countRows();
        for (let r = row; r < rowCount; r++) {
          instance.setDataAtCell(r, col, selectedValue);
          const cell = instance.getCell(r, col);
          const input = cell.querySelector('input');
          if (input) {
            input.value = newValue;
          }
          const select = cell.querySelector('select');
          if (select) {
            select.value = selectedValue;
            select.style.backgroundColor = dropdownColors[selectedValue] || 'white';
          }
        }
      });
      select.style.backgroundColor = dropdownColors[selectedValue] || 'white';
      select.selectedIndex = dropdownData.indexOf(selectedValue);
    };

    input.onchange = function () {
      const newCapacity = parseInt(this.value, 10);
      if (!isNaN(newCapacity)) {
        instance.batch(() => {
          const rowCount = instance.countRows();
          for (let r = row; r < rowCount; r++) {
            const cell = instance.getCell(r, col);
            const input = cell.querySelector('input');
            if (input) {
              input.value = newCapacity;
            }
          }
        });
      }
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
  }, [dropdownData, dropdownValues, dropdownColors]);

  const colHeaders = useMemo(() => [
    'Gün', 'Tarih', '1.Hat', '2.Hat', '3.Hat', '4.Hat', '1.Hat', '2.Hat', 'AYPE-T', 'YYPE', 'PP1', 'PP2', 'PTA', 'PA', 'MB'
  ], []);

  const nestedHeaders = useMemo(() => [
    [{ label: 'Takvim', colspan: 2 }, { label: 'PVC Fabrikası', colspan: 4 }, { label: 'AYPE Fabrikası', colspan: 2 }, 'AYPE-T', 'YYPE', { label: 'PP', colspan: 2 }, 'PTA', 'PA', 'MB'],
    ['Gün', 'Tarih', '1.Hat', '2.Hat', '3.Hat', '4.Hat', '1.Hat', '2.Hat', '', '', '1. Hat', '2. Hat', '', '', '']
  ], []);

  const columnSettings = useMemo(() => [
    { data: 0, readOnly: true, width: 100, editor: false },
    { data: 1, readOnly: true, width: 100, editor: false },
    { data: 2, renderer: dropdownRenderer, width: 80, editor: false },
    { data: 3, renderer: dropdownRenderer, width: 80, editor: false },
    { data: 4, renderer: dropdownRenderer, width: 80, editor: false },
    { data: 5, renderer: dropdownRenderer, width: 80, editor: false },
    { data: 6, renderer: dropdownRenderer, width: 80, editor: false },
    { data: 7, renderer: dropdownRenderer, width: 80, editor: false },
    { data: 8, renderer: dropdownRenderer, width: 80, editor: false },
    { data: 9, renderer: dropdownRenderer, width: 80, editor: false },
    { data: 10, renderer: dropdownRenderer, width: 80, editor: false },
    { data: 11, renderer: dropdownRenderer, width: 80, editor: false },
    { data: 12, renderer: dropdownRenderer, width: 80, editor: false },
    { data: 13, renderer: dropdownRenderer, width: 80, editor: false },
    { data: 14, renderer: dropdownRenderer, width: 80, editor: false },
  ], [dropdownRenderer]);

  return (
    <div className="production-table">
      <HotTable
        data={data}
        colHeaders={colHeaders}
        nestedHeaders={nestedHeaders}
        editor={false}
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
});

export default ProductionTable;
