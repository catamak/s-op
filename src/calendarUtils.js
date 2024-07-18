export const generateCalendarData = (month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const calendarData = [
      ['Takvim', '', 'PVC Fabrikası', '', '', '', 'AYPE Fabrikası', '', '', '', '', '', '', ''],
      ['Gun', 'Tarih', '1.Hat', '2.Hat', '3.Hat', '4.Hat', '1.Hat', '2.Hat', 'AYPE-T', 'YYPE', 'PP', 'PTA', 'PA', 'MB']
    ];
  
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month - 1, i);
      const formattedDate = `${('0' + i).slice(-2)}.${('0' + month).slice(-2)}.${year}`;
      calendarData.push([getDayOfWeek(date.getDay()), formattedDate, '', '', '', '', '', '', '', '', '', '', '', '']);
    }
  
    return calendarData;
  };
  
  export const getDayOfWeek = (dayIndex) => {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    return days[dayIndex];
  };
  