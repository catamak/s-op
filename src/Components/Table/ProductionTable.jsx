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
  const [loading, setLoading] = useState(false);
  const hotTableRef = useRef(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  function formatAPIDate(apiDate) {
    const date = new Date(apiDate); // API'den gelen ISO tarihini Date objesine dönüştürür
    return date.toLocaleDateString('tr-TR'); // 'DD.MM.YYYY' formatına dönüştürür
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://localhost:7032/api/Factories');
        if (!response.ok) {
          throw new Error('Failed to fetch factory data');
        }
        const factories = await response.json();
        setFactoriesData(factories);

        const factoryHeaders = [];
        const nestedFactoryHeaders = [{ label: 'Takvim', colspan: 2 }];
        const dropdownDataMap = {};
        const dropdownValueMap = {};

        factories.forEach(factory => {
          const lineNames = [];
          factory.productLines.forEach(line => {
            const uniqueLineKey = `${factory.factory_id}-${line.product_Line_id}`;
            lineNames.push(line.line_Name);

            line.factoryProducts.forEach(product => {
              dropdownDataMap[uniqueLineKey] = (dropdownDataMap[uniqueLineKey] || []).concat(product.product_Name);
              dropdownValueMap[`${uniqueLineKey}-${product.product_Name}`] = product.value;
            });
          });

          factoryHeaders.push(...lineNames);
          nestedFactoryHeaders.push({ label: factory.factory_Name, colspan: lineNames.length });
        });

        setColHeaders(['Gün', 'Tarih', ...factoryHeaders]);
        setNestedHeaders([nestedFactoryHeaders, ['Gün', 'Tarih', ...factoryHeaders]]);
        setDropdownData(dropdownDataMap);
        setDropdownValues(dropdownValueMap);

        const planningValuesResponse = await fetch('https://localhost:7032/api/PlanningValues/getPlanningValues');
        if (!planningValuesResponse.ok) {
          throw new Error('Failed to fetch planning values');
        }
        const planningValues = await planningValuesResponse.json();

        const daysInMonth = new Date(year, month, 0).getDate();
        const newData = Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(year, month - 1, i + 1);
          const dayName = date.toLocaleDateString('tr-TR', { weekday: 'long' });
          const formattedDate = date.toLocaleDateString('tr-TR');
          const row = [dayName, formattedDate, ...Array(factoryHeaders.length).fill('')];

          planningValues.planningValues.forEach(value => {
            const formattedAPIDate = formatAPIDate(value.date);
            if (formattedAPIDate === formattedDate) {
                row[value.productLineId + 1] = `${value.productName}|${value.value}`;
            }
        });
          return row;
        });


        console.log(newData)
        setData(newData);
      } catch (error) {
        console.error('Error loading data:', error);
        setSnackbarMessage('Error loading data. Please try again later.');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month, year]);



  useEffect(() => {
    checkIfTableIsComplete();
  }, [data]);

  const checkIfTableIsComplete = () => {
    let isComplete = true;

    data.forEach(row => {
      if (row.some(cell => cell === null || cell === '' || cell === undefined)) {
        isComplete = false;
      }
    })
    // console.log(data);
    updateTableData(data, isComplete);
  };

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

    let selectedProduct = value ? value.split('|')[0] : '';
    let selectedCapacity = value ? value.split('|')[1] : dropdownValues[`${uniqueLineKey}-${select.value}`] || '';

    select.value = selectedProduct;
    input.value = selectedCapacity;

    input.type = 'text';
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
      selectedProduct = select.value;
      selectedCapacity = dropdownValues[`${uniqueLineKey}-${selectedProduct}`] || '0';
      instance.batch(() => {
        const rowCount = instance.countRows();
        for (let r = 0; r < rowCount; r++) {
          instance.setDataAtCell(r, col, `${selectedProduct}|${selectedCapacity}`);
          const cell = instance.getCell(r, col);
          const inputElement = cell.querySelector('input');
          if (inputElement) {
            inputElement.value = selectedCapacity;
          }
          const selectElement = cell.querySelector('select');
          if (selectElement) {
            selectElement.value = selectedProduct;
          }
        }
      });
      checkIfTableIsComplete();
    };

    input.onchange = () => {
      const newCapacity = input.value;
      instance.batch(() => {
        const rowCount = instance.countRows();
        for (let r = 0; r < rowCount; r++) {
          const cell = instance.getCell(r, col);
          const inputElement = cell.querySelector('input');
          if (inputElement) {
            inputElement.value = newCapacity;
          }
          const existingData = instance.getDataAtCell(r, col).split('|')[0];
          instance.setDataAtCell(r, col, `${existingData}|${newCapacity}`);
        }
      });
      checkIfTableIsComplete();
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
          rowHeaders={false}
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
