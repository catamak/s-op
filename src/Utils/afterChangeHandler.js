// afterChangeHandler.js

const afterChangeHandler = (changes, source) => {
  if (source === 'loadData') {
    return; // Don't do anything if the data is just loading
  }

  changes.forEach(([row, prop, oldValue, newValue]) => {
    if (oldValue !== newValue) {
      console.log(`Row: ${row}, Property: ${prop}, Old Value: ${oldValue}, New Value: ${newValue}`);
      // Burada değişiklikleri işleyebilirsiniz, örneğin bir API çağrısı yapabilirsiniz
    }
  });
};

export default afterChangeHandler;
