export const DailyOptions = ({ interval, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Repeat every</label>
      <div className="flex items-center">
        <input
          type="number"
          min="1"
          max="365"
          value={interval}
          onChange={(e) => onChange({ interval: parseInt(e.target.value) || 1 })}
          className="w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="ml-2 text-sm text-gray-500">day(s)</span>
      </div>
    </div>
  );
};