import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  getDay,
  getDate,
  getWeekOfMonth,
  isBefore,
  isAfter,
  isSameDay,
  lastDayOfMonth,
  setDate,
  setMonth,
  startOfMonth,
  nextDay,
  previousDay,
  getWeek,
} from 'date-fns';

export const calculateRecurringDates = (config) => {
  const {
    recurrenceType,
    interval,
    daysOfWeek,
    dayOfMonth,
    weekOfMonth,
    dayOfWeekInMonth,
    month,
    startDate,
    endDate,
    endAfterOccurrences,
  } = config;

  let currentDate = new Date(startDate);
  const dates = [];
  let count = 0;

  while (true) {
    // Check if we've reached the end conditions
    if (endDate && isAfter(currentDate, endDate)) break;
    if (endAfterOccurrences && count >= endAfterOccurrences) break;
    if (count > 365) break; // Safety limit

    // Add the current date if it's after the start date
    if (!isBefore(currentDate, startDate) || isSameDay(currentDate, startDate)) {
      dates.push(new Date(currentDate));
      count++;
    }

    // Calculate the next date based on recurrence type
    switch (recurrenceType) {
      case 'daily':
        currentDate = addDays(currentDate, interval);
        break;

      case 'weekly':
        if (daysOfWeek.length > 0) {
          // Find the next day of week in the list
          const currentDay = getDay(currentDate);
          const nextDays = daysOfWeek.filter(day => day > currentDay);
          
          if (nextDays.length > 0) {
            currentDate = nextDay(currentDate, nextDays[0]);
          } else {
            currentDate = nextDay(addWeeks(currentDate, interval - 1), daysOfWeek[0]);
          }
        } else {
          currentDate = addWeeks(currentDate, interval);
        }
        break;

      case 'monthly':
  if (dayOfMonth !== null) {
    // Simple "day X of every month" pattern
    try {
      let nextDate = addMonths(currentDate, interval);
      // Handle cases where the day doesn't exist in the month
      const lastDay = getDate(lastDayOfMonth(nextDate));
      const adjustedDay = Math.min(dayOfMonth, lastDay);
      const newDate = setDate(nextDate, adjustedDay);
      
      // Ensure we're actually moving forward in time
      if (newDate.getTime() <= currentDate.getTime()) {
        currentDate = addMonths(newDate, 1); // Skip to next month if no progress
      } else {
        currentDate = newDate;
      }
    } catch (e) {
      break; // Invalid date
    }
  } else if (weekOfMonth !== null && dayOfWeekInMonth !== null) {
    // "First Monday of every month" pattern
    let nextMonth = addMonths(currentDate, interval);
    nextMonth = startOfMonth(nextMonth);

    if (weekOfMonth === -1) {
      // Last week of month
      const lastDay = lastDayOfMonth(nextMonth);
      currentDate = previousDay(lastDay, dayOfWeekInMonth);
    } else {
      // 1st-4th week of month
      let date = nextDay(nextMonth, dayOfWeekInMonth);
      for (let i = 1; i < weekOfMonth; i++) {
        date = addWeeks(date, 1);
      }
      currentDate = date;
    }

    // Ensure we don't duplicate the same date
    if (dates.length > 0 && currentDate.getTime() === dates[dates.length - 1].getTime()) {
      nextMonth = addMonths(nextMonth, 1);
      if (weekOfMonth === -1) {
        const lastDay = lastDayOfMonth(nextMonth);
        currentDate = previousDay(lastDay, dayOfWeekInMonth);
      } else {
        let date = nextDay(nextMonth, dayOfWeekInMonth);
        for (let i = 1; i < weekOfMonth; i++) {
          date = addWeeks(date, 1);
        }
        currentDate = date;
      }
    }
  }
  break;

      case 'yearly':
        let nextYear = addYears(currentDate, interval);
        if (month !== null) {
          nextYear = setMonth(nextYear, month);
          if (dayOfMonth !== null) {
            // Handle cases where the day doesn't exist in the month (e.g., Feb 30)
            const lastDay = getDate(lastDayOfMonth(nextYear));
            const adjustedDay = Math.min(dayOfMonth, lastDay);
            nextYear = setDate(nextYear, adjustedDay);
          }
        }
        currentDate = nextYear;
        break;

      default:
        return dates;
    }
  }

  return dates;
};