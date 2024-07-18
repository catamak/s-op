export const customRenderer = (instance, td, row, col, prop, value, cellProperties) => {
    const productionOptions = ['10', '20', '30', '40', '50'];
    
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    
    const select = document.createElement('select');
    select.className = 'htDropdownButton';
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
  
  export const colorRenderer = (instance, td, row, col, prop, value, cellProperties) => {
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
  