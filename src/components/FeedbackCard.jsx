export default function FeedbackCard({ feedback, darkMode }) {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };
  
    return (
      <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {feedback.name}
        </h3>
        <p className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <span className="font-medium">Email:</span> {feedback.email}
        </p>
        <p className={`mb-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Submitted: {formatDate(feedback.timestamp)}
        </p>
        <div className={`p-3 rounded ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
          {feedback.feedback}
        </div>
      </div>
    );
  }