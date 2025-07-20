import { render, screen, fireEvent } from '@testing-library/react';
import { RecurringDatePicker } from '../components/RecurringDatePicker';

describe('RecurringDatePicker', () => {
  test('renders with default options', () => {
    render(<RecurringDatePicker />);
    expect(screen.getByText('Recurring Date Picker')).toBeInTheDocument();
    expect(screen.getByText('Weekly')).toBeInTheDocument();
  });

  test('changes recurrence type', () => {
    render(<RecurringDatePicker />);
    fireEvent.click(screen.getByText('Monthly'));
    expect(screen.getByText('On day')).toBeInTheDocument();
  });

  test('updates daily interval', () => {
    render(<RecurringDatePicker />);
    fireEvent.click(screen.getByText('Daily'));
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '3' } });
    expect(input.value).toBe('3');
  });

  test('selects days of week', () => {
    render(<RecurringDatePicker />);
    fireEvent.click(screen.getByText('Mon'));
    expect(screen.getByText('Mon')).toHaveClass('bg-blue-500');
  });
});