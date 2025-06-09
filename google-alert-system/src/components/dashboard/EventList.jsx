import React from 'react';
import EventCard from './EventCard';

const EventsList = ({ events, loading, onRefresh }) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-500">Loading events...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V7a2 2 0 012-2h4a2 2 0 012 2v0M8 7v10a2 2 0 002 2h4a2 2 0 002-2V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h2M16 7h2a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming events</h3>
        <p className="mt-1 text-sm text-gray-500">Your calendar events will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <EventCard 
          key={event.eventId || index} 
          event={event} 
        />
      ))}
    </div>
  );
};

export default EventsList;
