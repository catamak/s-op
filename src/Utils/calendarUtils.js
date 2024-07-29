// calendarUtils.js

export const getMonths = () => {
  return [
    { value: 'Ocak', label: 'Ocak' },
    { value: 'Şubat', label: 'Şubat' },
    { value: 'Mart', label: 'Mart' },
    { value: 'Nisan', label: 'Nisan' },
    { value: 'Mayıs', label: 'Mayıs' },
    { value: 'Haziran', label: 'Haziran' },
    { value: 'Temmuz', label: 'Temmuz' },
    { value: 'Ağustos', label: 'Ağustos' },
    { value: 'Eylül', label: 'Eylül' },
    { value: 'Ekim', label: 'Ekim' },
    { value: 'Kasım', label: 'Kasım' },
    { value: 'Aralık', label: 'Aralık' },
  ];
};

export const getYears = (startYear, endYear) => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ value: year, label: year });
  }
  return years;
};
