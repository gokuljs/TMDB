const getYear = (date: string): number => {
  const year = new Date(date).getFullYear();
  return year;
};

export default getYear;
