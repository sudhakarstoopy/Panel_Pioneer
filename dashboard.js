import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch calendar events
    setTimeout(() => {
      setEvents([
        { id: 1, title: 'Interview with TechCorp', start: '2024-06-25 10:00:00' },
        { id: 2, title: 'Follow-up call with DataSci Inc.', start: '2024-06-26 14:00:00' },
      ]);
    }, 1000);
  }, []);

  return (
    <div className="Dashboard">
      <h2>Upcoming Events</h2>
      {events.map(event => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>Start time: {event.start}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
