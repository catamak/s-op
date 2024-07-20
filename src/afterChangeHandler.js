// src/afterChangeHandler.js
export const afterChange = (changes, source, hotInstance) => {
  if (source === 'loadData') return; // Veriler yüklendiğinde işlem yapma

  const totalRows = hotInstance.countRows(); // Toplam satır sayısını al

  if (changes) {
    // Performans için değişiklikleri batch olarak işleme
    hotInstance.batch(() => {
      changes.forEach(([row, col, oldValue, newValue]) => {
        if (row > 0 && newValue !== undefined && oldValue !== newValue) {
          for (let i = row + 1; i < totalRows; i++) {
            hotInstance.setDataAtCell(i, col, newValue); // Yeni değeri ata
          }
        }
      });
    });
  }
};
