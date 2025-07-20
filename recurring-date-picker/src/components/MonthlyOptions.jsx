import { useState, useEffect } from 'react';

export const MonthlyOptions = ({
  interval,
  dayOfMonth,
  weekOfMonth,
  dayOfWeekInMonth,
  onChange,
}) => {
  const [mode, setMode] = useState(dayOfMonth ? 'day' : 'weekday');
  const [inputError, setInputError] = useState('');

  // Validate day of month input
  useEffect(() => {
    if (mode === 'day' && dayOfMonth && (dayOfMonth < 1 || dayOfMonth > 31)) {
      setInputError('Day must be between 1-31');
    } else {
      setInputError('');
    }
  }, [dayOfMonth, mode]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'day') {
      onChange({ 
        dayOfMonth: dayOfMonth || 1, 
        weekOfMonth: null, 
        dayOfWeekInMonth: null 
      });
    } else {
      onChange({ 
        dayOfMonth: null, 
        weekOfMonth: weekOfMonth || 1, 
        dayOfWeekInMonth: dayOfWeekInMonth || 1 
      });
    }
  };

  const handleIntervalChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    onChange({ interval: Math.max(1, Math.min(12, value)) });
  };

  const handleDayOfMonthChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      onChange({ dayOfMonth: Math.max(1, Math.min(31, value)) });
    }
  };

  const handleWeekOfMonthChange = (e) => {
    onChange({ weekOfMonth: parseInt(e.target.value) });
  };

  const handleDayOfWeekChange = (e) => {
    onChange({ dayOfWeekInMonth: parseInt(e.target.value) });
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Repeat every
        </label>
        <div className="flex items-center">
          <input
            type="number"
            min="1"
            max="12"
            value={interval}
            onChange={handleIntervalChange}
            className="w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="ml-2 text-sm text-gray-500">month(s)</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex space-x-2">
          <button
            type="button"
            className={`px-3 py-1 text-sm rounded-md ${
              mode === 'day'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleModeChange('day')}
          >
            On day
          </button>
          <button
            type="button"
            className={`px-3 py-1 text-sm rounded-md ${
              mode === 'weekday'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleModeChange('weekday')}
          >
            On the
          </button>
        </div>

        {mode === 'day' ? (
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="mr-2 text-sm">Day</span>
              <input
                type="number"
                min="1"
                max="31"
                value={dayOfMonth || ''}
                onChange={handleDayOfMonthChange}
                className="w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="ml-2 text-sm text-gray-500">of the month</span>
            </div>
            {inputError && (
              <p className="text-sm text-red-500">{inputError}</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <select
                value={weekOfMonth || 1}
                onChange={handleWeekOfMonthChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={1}>First</option>
                <option value={2}>Second</option>
                <option value={3}>Third</option>
                <option value={4}>Fourth</option>
                <option value={-1}>Last</option>
              </select>

              <select
                value={dayOfWeekInMonth || 1}
                onChange={handleDayOfWeekChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={1}>Monday</option>
                <option value={2}>Tuesday</option>
                <option value={3}>Wednesday</option>
                <option value={4}>Thursday</option>
                <option value={5}>Friday</option>
                <option value={6}>Saturday</option>
                <option value={0}>Sunday</option>
              </select>

              <span className="text-sm text-gray-500">of the month</span>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};