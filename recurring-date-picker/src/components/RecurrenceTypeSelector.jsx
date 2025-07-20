export const RecurrenceTypeSelector = ({ recurrenceType, onChange }) => {
  const options = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Recurrence Pattern</label>
      <div className="grid grid-cols-4 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`py-2 px-3 rounded-md text-sm font-medium ${
              recurrenceType === option.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => onChange({ recurrenceType: option.value })}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};