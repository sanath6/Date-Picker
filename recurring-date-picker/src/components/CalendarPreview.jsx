import { format, isSameDay } from "date-fns";
import { useEffect, useRef, useState } from "react";

export const CalendarPreview = ({ dates, eventDate }) => {
  const dateRefs = useRef({});
  const containerRef = useRef(null);
  const [highlightedDate, setHighlightedDate] = useState(null);

  // Scroll to and highlight the event date when it changes
  useEffect(() => {
    if (eventDate) {
      setHighlightedDate(eventDate);
      
      // Wait for DOM to update then scroll to the date
      setTimeout(() => {
        const dateKey = eventDate.getTime();
        if (dateRefs.current[dateKey]) {
          const dateElement = dateRefs.current[dateKey];
          const container = containerRef.current;
          
          // Calculate scroll position
          const containerRect = container.getBoundingClientRect();
          const elementRect = dateElement.getBoundingClientRect();
          const scrollTop = container.scrollTop;
          const elementTop = elementRect.top - containerRect.top + scrollTop;
          
          // Scroll to center the element
          container.scrollTo({
            top: elementTop - containerRect.height / 2,
            behavior: 'smooth'
          });

          // Pulsing highlight animation
          dateElement.classList.add('animate-pulse', 'ring-2', 'ring-blue-500');
          const timer = setTimeout(() => {
            dateElement.classList.remove('animate-pulse', 'ring-2', 'ring-blue-500');
          }, 3000);

          return () => clearTimeout(timer);
        }
      }, 100);
    }
  }, [eventDate]);

  if (!dates || dates.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No dates to display. Configure the recurrence pattern above.
      </div>
    );
  }

  // Remove duplicate dates first
  const uniqueDates = dates.reduce((acc, date) => {
    const timestamp = date.getTime();
    if (!acc.some(d => d.getTime() === timestamp)) {
      acc.push(date);
    }
    return acc;
  }, []);

  // Group by month and organize into weeks
  const groupedMonths = uniqueDates.reduce((acc, date) => {
    const monthYear = format(date, 'MMMM yyyy');
    if (!acc[monthYear]) {
      acc[monthYear] = {
        firstDay: new Date(date.getFullYear(), date.getMonth(), 1),
        weeks: {}
      };
    }
    
    const weekNumber = Math.ceil(date.getDate() / 7);
    const weekKey = `week-${weekNumber}`;
    
    if (!acc[monthYear].weeks[weekKey]) {
      acc[monthYear].weeks[weekKey] = Array(7).fill(null);
    }
    
    const dayOfWeek = date.getDay(); // 0 (Sun) to 6 (Sat)
    acc[monthYear].weeks[weekKey][dayOfWeek] = date;
    
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Preview</h3>
      
      <div 
        ref={containerRef}
        className="overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        {Object.entries(groupedMonths).map(([monthYear, monthData]) => (
          <div key={monthYear} className="mb-8">
            <h4 className="font-medium mb-3 sticky top-0 bg-white py-2 z-10">
              {monthYear}
            </h4>
            
            <div className="grid grid-cols-7 gap-1 mb-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            {Object.entries(monthData.weeks).map(([weekKey, weekDays]) => (
              <div key={weekKey} className="grid grid-cols-7 gap-1 mb-1">
                {weekDays.map((date, index) => {
                  const isEventDate = date && highlightedDate && isSameDay(date, highlightedDate);
                  return (
                    <div
                      ref={el => { if (date) dateRefs.current[date.getTime()] = el; }}
                      key={date ? date.getTime() : `${weekKey}-${index}`}
                      className={`text-center p-2 rounded-md transition-all ${
                        date 
                          ? `border ${
                              isEventDate 
                                ? 'bg-blue-200 ring-2 ring-blue-500 animate-pulse' 
                                : 'bg-blue-50 hover:bg-blue-100'
                            }`
                          : 'opacity-0'
                      }`}
                    >
                      {date ? format(date, 'd') : ''}
                      {isEventDate && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};