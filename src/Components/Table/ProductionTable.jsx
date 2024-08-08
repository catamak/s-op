import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
  const [formProgressed, setFormProgressed] = useState(false);
  const hotTableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7032/api/Factories');
        const data = await response.json();
        setFactoriesData(data);

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
            return [dayName, formattedDate];
          });
          setData(newData);
        }

        const dropdownDataMap = {};
        const dropdownValueMap = {};

        data.forEach(factory => {
          factory.productLines.forEach(line => {
            dropdownDataMap[line.line_Name] = line.factoryProducts.map(product => product.product_Name);
            line.factoryProducts.forEach(product => {
              dropdownValueMap[product.product_Name] = product.value;
            });
          });
        });

        setDropdownData(dropdownDataMap);
        setDropdownValues(dropdownValueMap);
      } catch (error) {
        console.error('API çağrısında hata oluştu:', error);
      }
    };

    fetchData();
  }, [month, year]);

  useEffect(() => {
    const isComplete = checkIfTableIsComplete();
    updateTableData(data, isComplete);
  }, [data, updateTableData]);

  const checkIfTableIsComplete = () => {
    if (hotTableRef.current) {
      const hotInstance = hotTableRef.current.hotInstance;
      const rows = hotInstance.countRows();
      const cols = hotInstance.countCols();

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cellValue = hotInstance.getDataAtCell(row, col);
          if (cellValue === null || cellValue === '') {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  };

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
    select.style.fontSize = '10px';
    select.style.fontWeight = 'bold';

    const lineName = colHeaders[col];
    const options = dropdownData[lineName] || [];

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = '';
    select.appendChild(defaultOption);

    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.text = option;
      select.appendChild(optionElement);
    });

    select.value = value || '';

    select.onchange = () => {
      const selectedValue = select.value;
      const newValue = dropdownValues[selectedValue] || '';
      instance.batch(() => {
        const rowCount = instance.countRows();
        for (let r = row; r < rowCount; r++) {
          instance.setDataAtCell(r, col, selectedValue);
          const cell = instance.getCell(r, col);
          const inputElement = cell.querySelector('input');
          if (inputElement) {
            inputElement.value = newValue;
          }
          const selectElement = cell.querySelector('select');
          if (selectElement) {
            selectElement.value = selectedValue;
          }
        }
      });
      const isComplete = checkIfTableIsComplete();
      updateTableData(data, isComplete);
    };

    input.onchange = () => {
      const newCapacity = parseInt(input.value, 10);
      if (!isNaN(newCapacity)) {
        instance.batch(() => {
          const rowCount = instance.countRows();
          for (let r = row; r < rowCount; r++) {
            const cell = instance.getCell(r, col);
            const inputElement = cell.querySelector('input');
            if (inputElement) {
              inputElement.value = newCapacity;
            }
          }
        });
      }
      const isComplete = checkIfTableIsComplete();
      updateTableData(data, isComplete);
    };

    td.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'dropdown-container';
    container.appendChild(select);
    container.appendChild(input);
    td.appendChild(container);
  }, [colHeaders, dropdownData, dropdownValues]);

  const columnSettings = useMemo(() => [
    { data: 0, readOnly: true, width: 100, editor: false },
    { data: 1, readOnly: true, width: 100, editor: false },
    ...colHeaders.slice(2).map(() => ({ renderer: dropdownRenderer, width: 80, editor: false }))
  ], [dropdownRenderer, colHeaders]);

  const handleFormProgress = () => {
    setFormProgressed(true);
  };

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
        ref={hotTableRef}
      />
      <div className="buttons-container">
        {formProgressed && (
          <button onClick={handleFormProgress} className="form-progress-button">
            Formu İlerlet
          </button>
        )}
        {/* <button className="draft-save-button">Taslak Kaydet</button>
        <button className="send-for-review-button">Görüşe Yolla</button>
        <button className="publish-revision-button">Revizyonu Yayınla</button> */}
      </div>
    </div>
  );
});

export default ProductionTable;
