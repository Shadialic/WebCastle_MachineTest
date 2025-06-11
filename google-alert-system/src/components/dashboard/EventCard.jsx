import React from 'react';

const EventCard = ({ event }) => {

  const formatTimeRange = (startTime, endTime) => {
    if (!startTime) return '';
    
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : null;
    
    const startFormatted = start.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    if (end) {
      const endFormatted = end.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      if (start.toDateString() === end.toDateString()) {
        return `${startFormatted} - ${endFormatted}`;
      } else {
        const endFormattedFull = end.toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        return `${startFormatted} - ${endFormattedFull}`;
      }
    }
    
    return startFormatted;
  };

  return (
    <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
      <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
        <p className="text-sm text-gray-500">
          {event.startTime && event.endTime 
            ? formatTimeRange(event.startTime, event.endTime)
            : event.time || 'No time specified'
          }
        </p>
        {event.location && (
          <p className="text-xs text-gray-400 mt-1">{event.location}</p>
        )}
      </div>
      <div className="flex-shrink-0">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          event.reminderSent === false 
            ? 'bg-yellow-100 text-yellow-800' 
            : event.reminderSet || event.reminderSent
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {event.reminderSent === false 
            ? 'Reminder Pending'
            : event.reminderSet || event.reminderSent 
            ? 'Reminder Set' 
            : 'No Reminder'
          }
        </span>
      </div>
    </div>
  );
};

export default EventCard;