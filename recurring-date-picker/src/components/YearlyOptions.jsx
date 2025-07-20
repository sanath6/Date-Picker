const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const YearlyOptions = ({ interval, month, dayOfMonth, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Repeat every</label>
        <div className="flex items-center">
          <input
            type="number"
            min="1"
            max="10"
            value={interval}
            onChange={(e) => onChange({ interval: parseInt(e.target.value) || 1 })}
            className="w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="ml-2 text-sm text-gray-500">year(s)</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm">On</span>
          <select
            value={month !== null ? month : new Date().getMonth()}
            onChange={(e) => onChange({ month: parseInt(e.target.value) })}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <span className="mr-2 text-sm">Day</span>
          <input
            type="number"
            min="1"
            max="31"
            value={dayOfMonth || new Date().getDate()}
            onChange={(e) => onChange({ dayOfMonth: parseInt(e.target.value) || 1 })}
            className="w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};