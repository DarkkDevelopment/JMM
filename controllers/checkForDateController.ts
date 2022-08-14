const checkForDate = (month: number, year: number) => {
  const newDate = new Date();
  const currentMonth = newDate.getMonth() + 1;
  const currentYear = newDate.getFullYear();
  if (month === currentMonth && year === currentYear) {
    return true;
  } else {
    return false;
  }
};

export { checkForDate };
