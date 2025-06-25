const Notification = ({ message, type = 'success' }) => {
  if (!message) {
    return null;
  }

  const colorClass = {
    success: 'bg-green-500',
    error: 'bg-red-500',
  }[type];

  return (
    <div className={`fixed top-24 left-1/2 -translate-x-1/2 text-white py-3 px-6 rounded-lg shadow-lg animate-fade-in-out z-50 ${colorClass}`}>
      {message}
    </div>
  );
};

export default Notification;