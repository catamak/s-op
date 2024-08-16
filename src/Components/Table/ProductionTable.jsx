import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import './ProductionTable.css';
import Spinner from '../spinner';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ProductionTable = React.memo(({ revision, month, year, updateTableData }) => {
  const [data, setData] = useState([]);
  const [colHeaders, setColHeaders] = useState(['Gün', 'Tarih']);
  const [nestedHeaders, setNestedHeaders] = useState([['Gün', 'Tarih']]);
  const [factoriesData, setFactoriesData] = useState([]);
  const [dropdownData, setDropdownData] = useState({});
  const [dropdownValues, setDropdownValues] = useState({});
  const [formProgressed, setFormProgressed] = useState(false);
  const hotTableRef = useRef(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch data and initialize table
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://localhost:7032/api/Factories');
        const data = await response.json();
        setFactoriesData(data);

        const factoryHeaders = [];
        const nestedFactoryHeaders = [{ label: 'Takvim', colspan: 2 }];
        const dropdownDataMap = {};
        const dropdownValueMap = {};

        data.forEach(factory => {
          const lineNames = [];
          factory.productLines.forEach(line => {
            const uniqueLineKey = `${factory.factory_id}-${line.product_Line_id}`;
            lineNames.push(line.line_Name);

            const productsForLine = line.factoryProducts.map(product => ({
              name: product.product_Name,
              value: product.value
            }));

            dropdownDataMap[uniqueLineKey] = productsForLine.map(product => product.name);
            productsForLine.forEach(product => {
              dropdownValueMap[`${uniqueLineKey}-${product.name}`] = product.value;
            });
          });

          factoryHeaders.push(...lineNames);
          nestedFactoryHeaders.push({ label: factory.factory_Name, colspan: lineNames.length });
        });

        setColHeaders(['Gün', 'Tarih', ...factoryHeaders]);
        setNestedHeaders([nestedFactoryHeaders, ['Gün', 'Tarih', ...factoryHeaders]]);
        setDropdownData(dropdownDataMap);
        setDropdownValues(dropdownValueMap);

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
      } catch (error) {
        console.error('API çağrısında hata oluştu:', error);
        setSnackbarMessage('Veri yüklenirken hata oluştu.');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month, year]);

  // Check table completion and update parent component
  useEffect(() => {
    const isComplete = checkIfTableIsComplete();
    updateTableData(data, isComplete);
  }, [data, updateTableData]);

  // Check if table is complete
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

  // Dropdown renderer function
  const dropdownRenderer = useCallback((instance, td, row, col, prop, value, cellProperties) => {
    Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);

    const select = document.createElement('select');
    const input = document.createElement('input');

    const factoryHeaders = colHeaders.slice(2);

    let accumulatedColCount = 2;
    let factoryIndex;
    let lineIndex;

    for (let i = 0; i < factoriesData.length; i++) {
      const factory = factoriesData[i];
      if (col >= accumulatedColCount && col < accumulatedColCount + factory.productLines.length) {
        factoryIndex = i;
        lineIndex = col - accumulatedColCount;
        break;
      }
      accumulatedColCount += factory.productLines.length;
    }

    if (factoryIndex === undefined || lineIndex === undefined) return;

    const factory = factoriesData[factoryIndex];
    const line = factory.productLines[lineIndex];

    if (!line) return;

    const uniqueLineKey = `${factory.factory_id}-${line.product_Line_id}`;
    const options = dropdownData[uniqueLineKey] || [];

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

    input.type = 'text';
    input.value = dropdownValues[`${uniqueLineKey}-${select.value}`] || '';
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

    select.onchange = () => {
      const selectedValue = select.value;
      const newValue = dropdownValues[`${uniqueLineKey}-${selectedValue}`] || '';
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
      input.value = newValue;
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
  }, [colHeaders, dropdownData, dropdownValues, factoriesData]);

  const columnSettings = useMemo(() => [
    { data: 0, readOnly: true, width: 100, editor: false },
    { data: 1, readOnly: true, width: 100, editor: false },
    ...colHeaders.slice(2).map(() => ({ renderer: dropdownRenderer, width: 80, editor: false }))
  ], [dropdownRenderer, colHeaders]);

  // Handle form progress change
  const handleFormProgressChange = () => {
    const isComplete = checkIfTableIsComplete();
    setFormProgressed(isComplete);
    if (!isComplete) {
      setSnackbarMessage('Lütfen tabloyu tamamlayın.');
      setSnackbarOpen(true);
    } else {
      updateTableData(data, isComplete);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="production-table">
      {loading ? <Spinner /> : (
        <HotTable
          ref={hotTableRef}
          data={data}
          colHeaders={colHeaders}
          nestedHeaders={nestedHeaders}
          columns={columnSettings}
          rowHeaders={true}
          manualColumnResize={true}
          height="auto"
          stretchH="all"
          licenseKey="non-commercial-and-evaluation"
        />
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    
    </div>
  );
});

export default ProductionTable;
