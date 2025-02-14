import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const GuardFeedback: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guards, setGuards] = useState<any[]>([]);
  const [selectedGuard, setSelectedGuard] = useState<string>("");
  const [fieldVisitorId, setFieldVisitorId] = useState<string>("");
console.log("selectedGuard",selectedGuard);
console.log("comment",comment);
console.log("fieldVisitorId",fieldVisitorId);
console.log("rating",rating);
  // Fetch logged-in field visitor
  const fetchFieldVisitor = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const res = await fetch("/api/getfielduser");
      const data = await res.json();
  
      if (res.ok) {
        setFieldVisitorId(data.user._id); // Corrected path
      } else {
        setError(data.error || "Failed to fetch visitor");
      }
    } catch (error) {
      setError("Visitor fetch failed");
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch all guards
  const fetchGuards = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const res = await fetch("/api/getallguard"); // Correct API route
      const guardsData = await res.json();
  
      if (res.ok) {
        setGuards(guardsData.guards);
      } else {
        setError(guardsData.message || "Failed to fetch guards");
      }
    } catch (error) {
      setError("Guards fetch failed");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchGuards();
    fetchFieldVisitor();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    if (!rating || !comment || !selectedGuard || !fieldVisitorId) {
      setMessage("All fields are required.");
      console.log("rating : " + rating + " comment : " + comment + " selectedGuard : " + selectedGuard);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ratingCount: rating, comment, givenBy: fieldVisitorId, givenTo: selectedGuard }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setMessage("Feedback submitted successfully!");
      setRating(0);
      setComment("");
      setSelectedGuard("");
    } catch (error: any) {
      setMessage(error.message || "Failed to submit feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (value: number, isInteractive: boolean = false) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-6 w-6 ${index < (isInteractive ? hoveredRating || rating : value) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        ${isInteractive ? "cursor-pointer transition-colors duration-150" : ""}`}
        onMouseEnter={() => isInteractive && setHoveredRating(index + 1)}
        onMouseLeave={() => isInteractive && setHoveredRating(0)}
        onClick={() => isInteractive && setRating(index + 1)}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Feedback</h2>
      {message && <p className={`text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"} mb-4`}>{message}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rate the guard's performance</label>
          <div className="flex gap-1">{renderStars(rating, true)}</div>
        </div>

        {/* Guard Selection Dropdown */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select a Guard</label>
          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : (
            <select
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedGuard}
              onChange={(e) => setSelectedGuard(e.target.value)}
            >
              <option value="">Choose a guard</option>
              {guards.map((guard) => (
                <option key={guard._id} value={guard._id}>
                  {guard.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Please share your experience with the guard..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default GuardFeedback;
