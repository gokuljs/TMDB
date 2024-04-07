const getYear = (date: string): number | null => {
  const year = new Date(date).getFullYear();
  if (isNaN(year)) {
    return null;
  }
  return year;
};

export default getYear;
