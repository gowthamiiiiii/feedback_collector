import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeedbackForm({ darkMode }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!feedback.trim()) newErrors.feedback = 'Feedback is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('https://feedback-collector-wks8.onrender.com/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          feedback,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setName('');
        setEmail('');
        setFeedback('');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`mb-8 p-6 rounded-lg shadow-md transition-all ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="mb-4">
        <label 
          htmlFor="name" 
          className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} ${errors.name ? 'border-red-500' : ''}`}
          placeholder="Your name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label 
          htmlFor="email" 
          className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} ${errors.email ? 'border-red-500' : ''}`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="mb-6">
        <label 
          htmlFor="feedback" 
          className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
        >
          Feedback
        </label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="4"
          className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} ${errors.feedback ? 'border-red-500' : ''}`}
          placeholder="Your feedback..."
        ></textarea>
        {errors.feedback && <p className="mt-1 text-sm text-red-500">{errors.feedback}</p>}
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-md font-medium ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'} ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/admin')}
          className={`px-4 py-2 rounded-md font-medium ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
        >
          View Submitted Feedback
        </button>
      </div>
    </form>
  );
}
