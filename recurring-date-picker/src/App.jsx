import { RecurringDatePicker } from './components/RecurringDatePicker';

function App() {
  const handleChange = (config) => {
    console.log('Recurrence config changed:', config);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <RecurringDatePicker onChange={handleChange} />
    </div>
  );
}

export default App;