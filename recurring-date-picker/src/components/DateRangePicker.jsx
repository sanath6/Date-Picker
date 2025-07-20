import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DateRangePicker = ({
  startDate,
  endDate,
  endAfterOccurrences,
  onChange,
}) => {
  const [endOption, setEndOption] = useState(endDate ? 'date' : endAfterOccurrences ? 'occurrences' : 'never');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => onChange({ startDate: date })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ends</label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="never"
              name="endOption"
              checked={endOption === 'never'}
              onChange={() => {
                setEndOption('never');
                onChange({ endDate: null, endAfterOccurrences: null });
              }}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="never" className="ml-2 block text-sm text-gray-700">
              Never
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="date"
              name="endOption"
              checked={endOption === 'date'}
              onChange={() => {
                setEndOption('date');
                onChange({ endAfterOccurrences: null });
              }}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="date" className="ml-2 block text-sm text-gray-700">
              On
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => onChange({ endDate: date })}
              minDate={startDate}
              className="ml-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={endOption !== 'date'}
            />
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="occurrences"
              name="endOption"
              checked={endOption === 'occurrences'}
              onChange={() => {
                setEndOption('occurrences');
                onChange({ endDate: null });
              }}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="occurrences" className="ml-2 block text-sm text-gray-700">
              After
            </label>
            <input
              type="number"
              min="1"
              max="365"
              value={endAfterOccurrences || ''}
              onChange={(e) => onChange({ endAfterOccurrences: parseInt(e.target.value) || 1 })}
              className="ml-2 w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={endOption !== 'occurrences'}
            />
            <span className="ml-2 text-sm text-gray-500">occurrences</span>
          </div>
        </div>
      </div>
    </div>
  );
};