
export const formatDateRange = (start: string, end?: string): string => {
  const getDayWithSuffix = (date: Date): string => {
    const day = date.getDate();
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };

  const startDate = new Date(start);
   const startDay = getDayWithSuffix(startDate);
   
  const month = startDate.toLocaleString('default', { month: 'long' }); // "July"
  const year = startDate.getFullYear();
  if(!end) 
    return `${startDay} ${month} ${year}` 
  const endDate = new Date(end);

 
  const endDay = getDayWithSuffix(endDate);


  return `${startDay} - ${endDay} ${month} ${year}`;
};
