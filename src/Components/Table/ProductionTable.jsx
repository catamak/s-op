import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import './ProductionTable.css';

const ProductionTable = React.memo(({ revision, month, year, updateTableData }) => {
  const [data, setData] = useState([]);
  const [colHeaders, setColHeaders] = useState(['Gün', 'Tarih']);
  const [nestedHeaders, setNestedHeaders] = useState([['Gün', 'Tarih']]);
  const [factoriesData, setFactoriesData] = useState([]);
  const [dropdownData, setDropdownData] = useState({});
  const [dropdownValues, setDropdownValues] = useState({});
  const [dropdownColors, setDropdownColors] = useState({});

  useEffect(() => {
    fetch('https://localhost:7032/api/Factories')
      .then(response => response.json())
      .then(data => {
        console.log('Factories Data:', data); // Konsola veriyi yazdırma
        setFactoriesData(data);

        // Dinamik olarak tablo başlıklarını oluşturuyoruz
        const factoryHeaders = [];
        const nestedFactoryHeaders = [{ label: 'Takvim', colspan: 2 }];

        data.forEach(factory => {
          const lineNames = factory.productLines.map(line => line.line_Name);
          factoryHeaders.push(...lineNames);
          nestedFactoryHeaders.push({ label: factory.factory_Name, colspan: lineNames.length });
        });

        setColHeaders(['Gün', 'Tarih', ...factoryHeaders]);
        setNestedHeaders([nestedFactoryHeaders, ['Gün', 'Tarih', ...factoryHeaders]]);

        if (month && year) {
          const daysInMonth = new Date(year, month, 0).getDate();
          const newData = Array.from({ length: daysInMonth }, (_, i) => {
            const currentDate = new Date(year, month - 1, i + 1);
            const dayName = currentDate.toLocaleDateString('tr-TR', { weekday: 'long' });
            const formattedDate = currentDate.toLocaleDateString('tr-TR');

            // Gün ve Tarih bilgisiyle birlikte tablo verilerini oluşturuyoruz
            return [dayName, formattedDate];
          });

          setData(newData);
        }

        // Dropdown verilerini hazırlıyoruz
        const dropdownDataMap = {};
        data.forEach(factory => {
          factory.productLines.forEach(line => {
            dropdownDataMap[line.line_Name] = line.factoryProducts.map(product => product.product_Name);
          });
        });
        setDropdownData(dropdownDataMap);
      })
      .catch(error => console.error('API çağrısında hata oluştu:', error));
  }, [month, year]);

  useEffect(() => {
    fetch('https://localhost:7032/api/Values')
      .then(response => response.json())
      .then(data => {
        console.log('Dropdown Data:', data); // Konsola veriyi yazdırma
        const dropdownMap = {};
        data.forEach(item => {
          dropdownMap[item.Value] = item.SomeNumericValue;  // Veritabanındaki uygun alanı kullanın
        });

        const dropdownColorMap = {};
        data.forEach(item => {
          dropdownColorMap[item.Value] = item.SomeColorValue;  // Veritabanındaki uygun alanı kullanın
        });

        setDropdownValues(dropdownMap);
        setDropdownColors(dropdownColorMap);
      })
      .catch(error => console.error('API çağrısında hata oluştu:', error));
  }, []);

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
    input.style.fontSize = '10px';
    input.style.fontWeight = 'bold';

    select.style.width = '100%';
    select.style.height = '50%';
    select.value = value || '';
    select.style.fontSize = '10px';
    select.style.fontWeight = 'bold';

    const lineName = colHeaders[col];
    const options = dropdownData[lineName] || [];

    options.forEach(option => {
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
      select.selectedIndex = options.indexOf(selectedValue);
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
    select.selectedIndex = options.indexOf(value);

    td.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'dropdown-container';
    container.appendChild(select);
    container.appendChild(input);
    td.appendChild(container);
  }, [colHeaders, dropdownData, dropdownValues, dropdownColors]);

  const columnSettings = useMemo(() => [
    { data: 0, readOnly: true, width: 100, editor: false },
    { data: 1, readOnly: true, width: 100, editor: false },
    ...colHeaders.slice(2).map(() => ({ renderer: dropdownRenderer, width: 80, editor: false }))
  ], [dropdownRenderer, colHeaders]);

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