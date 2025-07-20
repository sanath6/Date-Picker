import { useState, useEffect } from 'react';
import { RecurrenceTypeSelector } from './RecurrenceTypeSelector';
import { DailyOptions } from './DailyOptions';
import { WeeklyOptions } from './WeeklyOptions';
import { MonthlyOptions } from './MonthlyOptions';
import { YearlyOptions } from './YearlyOptions';
import { DateRangePicker } from './DateRangePicker';
import { CalendarPreview } from './CalendarPreview';
import { calculateRecurringDates } from './dateCalculations';

export const RecurringDatePicker = ({ initialConfig, onChange }) => {
  const [config, setConfig] = useState(initialConfig || {
    recurrenceType: 'weekly',
    interval: 1,
    daysOfWeek: [],
    dayOfMonth: null,
    month: null,
    weekOfMonth: null,
    dayOfWeekInMonth: null,
    startDate: new Date(),
    endDate: null,
    endAfterOccurrences: null,
  });

  const [previewDates, setPreviewDates] = useState([]);

  useEffect(() => {
    const dates = calculateRecurringDates(config);
    setPreviewDates(dates);
    onChange && onChange({ ...config, previewDates: dates });
  }, [config, onChange]);

  const handleConfigChange = (updates) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const renderRecurrenceOptions = () => {
    switch (config.recurrenceType) {
      case 'daily':
        return <DailyOptions interval={config.interval} onChange={handleConfigChange} />;
      case 'weekly':
        return (
          <WeeklyOptions
            interval={config.interval}
            daysOfWeek={config.daysOfWeek}
            onChange={handleConfigChange}
          />
        );
      case 'monthly':
        return (
          <MonthlyOptions
            interval={config.interval}
            dayOfMonth={config.dayOfMonth}
            weekOfMonth={config.weekOfMonth}
            dayOfWeekInMonth={config.dayOfWeekInMonth}
            onChange={handleConfigChange}
          />
        );
      case 'yearly':
        return (
          <YearlyOptions
            interval={config.interval}
            month={config.month}
            dayOfMonth={config.dayOfMonth}
            onChange={handleConfigChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recurring Date Picker</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <RecurrenceTypeSelector
            recurrenceType={config.recurrenceType}
            onChange={handleConfigChange}
          />
          
          {renderRecurrenceOptions()}
          
          <DateRangePicker
            startDate={config.startDate}
            endDate={config.endDate}
            endAfterOccurrences={config.endAfterOccurrences}
            onChange={handleConfigChange}
          />
        </div>
        
        <div>
          <CalendarPreview dates={previewDates} />
          
        </div>
         
      </div>
    </div>
  );
};