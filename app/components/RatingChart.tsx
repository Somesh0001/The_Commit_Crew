// components/RatingChart.tsx
'use client';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
 // Define your Feedback type
 interface Feedback {
    _id: string;
    ratingCount: number;
    comment: string;
    givenBy: { name: string; email: string };
    createdAt: string;
  }
  
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RatingChartProps {
  feedbacks: Feedback[];
}

const RatingChart = ({ feedbacks }: RatingChartProps) => {
  const processChartData = () => {
    // Group feedback by day
    const dailyCounts: { [key: string]: number } = {};

    feedbacks.forEach((feedback) => {
      const date = new Date(feedback.createdAt);
      const day = date.getDate();
      dailyCounts[day] = (dailyCounts[day] || 0) + 1;
    });

    // Generate labels for all days in month
    const daysInMonth = 28; // February 2025
    const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return {
      labels,
      datasets: [
        {
          label: 'Daily Ratings',
          data: labels.map(day => dailyCounts[day] || 0),
          backgroundColor: 'rgba(79, 70, 229, 0.7)',
          borderColor: 'rgb(79, 70, 229)',
          borderWidth: 1,
          borderRadius: 4,
        }
      ]
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Ratings Overview - February 2025',
        font: { size: 18 }
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#f9fafb',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Days of Month', color: '#4b5563' },
        grid: { color: '#e5e7eb' }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Number of Ratings', color: '#4b5563' },
        grid: { color: '#e5e7eb' },
        ticks: { stepSize: 1 }
      }
    }
  };

  const totalRatings = feedbacks.length;
  const latestReview = feedbacks[0]?.comment || "No reviews yet";

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Rating Statistics</h3>
        <p className="text-sm text-gray-500">Showing data from February 1-28, 2025</p>
      </div>
      
      <div className="relative h-96">
        <Bar data={processChartData()} options={options} />
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Latest Review: "{latestReview}"</p>
        <p>Total Ratings This Month: {totalRatings}</p>
      </div>
    </div>
  );
};

export default RatingChart;