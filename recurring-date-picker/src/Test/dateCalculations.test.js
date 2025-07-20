import { calculateRecurringDates } from '../components/dateCalculations';
import { addDays, addWeeks, addMonths, addYears, nextDay } from 'date-fns';

describe('calculateRecurringDates', () => {
  const startDate = new Date(2023, 0, 1); // Jan 1, 2023 (Sunday)

  test('daily recurrence', () => {
    const config = {
      recurrenceType: 'daily',
      interval: 1,
      startDate,
      endDate: addDays(startDate, 5),
    };

    const dates = calculateRecurringDates(config);
    expect(dates).toHaveLength(6);
    expect(dates[0]).toEqual(startDate);
    expect(dates[1]).toEqual(addDays(startDate, 1));
  });

  test('weekly recurrence with specific days', () => {
    const config = {
      recurrenceType: 'weekly',
      interval: 1,
      daysOfWeek: [1, 3], // Monday, Wednesday
      startDate,
      endDate: addWeeks(startDate, 2),
    };

    const dates = calculateRecurringDates(config);
    expect(dates).toHaveLength(4);
    expect(dates[0]).toEqual(nextDay(startDate, 1)); // First Monday
    expect(dates[1]).toEqual(nextDay(startDate, 3)); // First Wednesday
  });

  test('monthly recurrence on specific day', () => {
    const config = {
      recurrenceType: 'monthly',
      interval: 1,
      dayOfMonth: 15,
      startDate,
      endDate: addMonths(startDate, 3),
    };

    const dates = calculateRecurringDates(config);
    expect(dates).toHaveLength(3);
    expect(dates[0].getDate()).toBe(15);
    expect(dates[0].getMonth()).toBe(0); // January
    expect(dates[1].getMonth()).toBe(1); // February
  });

  test('monthly recurrence on nth weekday', () => {
    const config = {
      recurrenceType: 'monthly',
      interval: 1,
      weekOfMonth: 2,
      dayOfWeekInMonth: 2, // Second Tuesday
      startDate,
      endDate: addMonths(startDate, 3),
    };

    const dates = calculateRecurringDates(config);
    expect(dates).toHaveLength(3);
    expect(dates[0].getDate()).toBe(10); // Jan 10, 2023 is the 2nd Tuesday
    expect(dates[1].getDate()).toBe(14); // Feb 14, 2023
  });

  test('yearly recurrence', () => {
    const config = {
      recurrenceType: 'yearly',
      interval: 1,
      month: 6, // July
      dayOfMonth: 4,
      startDate,
      endDate: addYears(startDate, 2),
    };

    const dates = calculateRecurringDates(config);
    expect(dates).toHaveLength(2);
    expect(dates[0].getMonth()).toBe(6);
    expect(dates[0].getDate()).toBe(4);
    expect(dates[1].getFullYear()).toBe(2024);
  });

  test('end after occurrences', () => {
    const config = {
      recurrenceType: 'daily',
      interval: 1,
      startDate,
      endAfterOccurrences: 3,
    };

    const dates = calculateRecurringDates(config);
    expect(dates).toHaveLength(3);
  });
});