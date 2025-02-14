import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Clock, User, AlertTriangle } from 'lucide-react';

interface FeedbackFormData {
  rating: number;
  comment: string;
  category: string;
}

interface Review {
  id: number;
  visitorName: string;
  rating: number;
  comment: string;
  category: string;
  createdAt: string;
}

const GuardFeedback: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('general');

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: 1,
      visitorName: "John Doe",
      rating: 5,
      comment: "Very vigilant and professional guard. Always at his post.",
      category: "punctuality",
      createdAt: "2025-03-01T10:00:00Z"
    },
    {
      id: 2,
      visitorName: "Jane Smith",
      rating: 4,
      comment: "Helpful and courteous. Maintains good security protocols.",
      category: "behavior",
      createdAt: "2025-02-28T15:30:00Z"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ rating, comment, category });
    // Reset form
    setRating(0);
    setComment('');
    setCategory('general');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderStars = (value: number, isInteractive: boolean = false) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-6 w-6 ${
          index < (isInteractive ? hoveredRating || rating : value)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        } ${isInteractive ? 'cursor-pointer transition-colors duration-150' : ''}`}
        onMouseEnter={() => isInteractive && setHoveredRating(index + 1)}
        onMouseLeave={() => isInteractive && setHoveredRating(0)}
        onClick={() => isInteractive && setRating(index + 1)}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Feedback Form Section */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rate the guard's performance
            </label>
            <div className="flex gap-1">
              {renderStars(rating, true)}
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Feedback Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="general">General</option>
              <option value="punctuality">Punctuality</option>
              <option value="behavior">Behavior</option>
              <option value="vigilance">Vigilance</option>
              <option value="protocol">Protocol Following</option>
            </select>
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Please share your experience with the guard..."
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Previous Reviews Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Feedback</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-medium text-gray-900">{review.visitorName}</span>
                </div>
                <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
              </div>
              <div className="flex items-center mb-2">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm text-gray-600">
                  for {review.category.charAt(0).toUpperCase() + review.category.slice(1)}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuardFeedback;