import getYear from '@/lib/getYear';

describe('getYear function', () => {
  it('should return the correct year when provided a valid date string', () => {
    const date = '2023-10-15';
    const result = getYear(date);
    expect(result).toBe(2023);
  });

  it('should return NaN if provided an invalid date string', () => {
    const invalidDate = 'invalid date';
    const result = getYear(invalidDate);
    expect(result).toBeNull();
  });

  it('should handle leap years correctly', () => {
    const leapYearDate = '2020-02-29'; // Leap year date
    const result = getYear(leapYearDate);
    expect(result).toBe(2020);
  });

  it('should return NaN if date string is empty', () => {
    const emptyDate = '';
    const result = getYear(emptyDate);
    expect(result).toBeNull();
  });
});
