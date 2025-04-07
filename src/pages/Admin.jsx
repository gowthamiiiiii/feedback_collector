import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeedbackCard from '../components/FeedbackCard';

export default function Admin() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('https://feedback-collector-wks8.onrender.com/feedbacks');
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              Back to Form
            </Link>
          </div>
        </div>

        {loading ? (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Loading feedbacks...
          </div>
        ) : feedbacks.length === 0 ? (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No feedbacks submitted yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {feedbacks.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} darkMode={darkMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
