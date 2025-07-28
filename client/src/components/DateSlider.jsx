import React from 'react';

export default function DateSlider({ selectedDate, setSelectedDate }) {
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  return (
    <ul className="nav nav-pills overflow-auto">
      {dates.map((date) => (
        <li className="nav-item" key={date}>
          <button
            className={`nav-link ${selectedDate === date ? 'active' : ''}`}
            onClick={() => setSelectedDate(date)}
          >
            {new Date(date).toDateString()}
          </button>
        </li>
      ))}
    </ul>
  );
}
