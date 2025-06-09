import React from 'react';
import EventsList from './EventList';

const CalendarEvents = ({ events, loading, onRefresh }) => (
  <div className="bg-white rounded-lg shadow">
    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
        <p className="text-sm text-gray-500">Events from your Google Calendar</p>
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Refresh'}
      </button>
    </div>
    
    <div className="p-6">
      <EventsList 
        events={events} 
        loading={loading} 
        onRefresh={onRefresh} 
      />
    </div>
  </div>
);

export default CalendarEvents;