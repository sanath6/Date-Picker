const daysOfWeek = [
  { value: 0, label: 'Sun' },
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
  { value: 6, label: 'Sat' },
];

export const WeeklyOptions = ({ interval, daysOfWeek: selectedDays, onChange }) => {
  const toggleDay = (day) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    onChange({ daysOfWeek: newDays });
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Repeat every</label>
        <div className="flex items-center">
          <input
            type="number"
            min="1"
            max="52"
            value={interval}
            onChange={(e) => onChange({ interval: parseInt(e.target.value) || 1 })}
            className="w-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="ml-2 text-sm text-gray-500">week(s)</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Repeat on</label>
        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((day) => (
            <button
              key={day.value}
              type="button"
              className={`py-2 rounded-md text-sm ${
                selectedDays.includes(day.value)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => toggleDay(day.value)}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};