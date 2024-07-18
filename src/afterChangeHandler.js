export const afterChange = (calendarData, setCalendarData) => (changes, source) => {
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
  