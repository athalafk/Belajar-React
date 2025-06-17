import React from 'react';

const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg animate-fade-in-out z-50">
      {message}
    </div>
  );
};

export default Notification;