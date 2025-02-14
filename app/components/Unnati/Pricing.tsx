import React from "react";

const Pricing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Pricing Plans</h2>
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Pricing Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-200 hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Basic</h3>
          <p className="text-gray-500 mb-4">Perfect for individuals</p>
          <div className="text-3xl font-bold text-gray-800">$9.99<span className="text-sm font-normal">/mo</span></div>
          <ul className="mt-4 mb-6 space-y-2 text-gray-600">
            <li>✔ 10 Projects</li>
            <li>✔ Basic Support</li>
            <li>✔ 5GB Storage</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Choose Plan</button>
        </div>

        {/* Pricing Card 2 - Standard */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-2 border-blue-500 transform scale-105">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Standard</h3>
          <p className="text-gray-500 mb-4">Best for small teams</p>
          <div className="text-3xl font-bold text-gray-800">$19.99<span className="text-sm font-normal">/mo</span></div>
          <ul className="mt-4 mb-6 space-y-2 text-gray-600">
            <li>✔ 50 Projects</li>
            <li>✔ Priority Support</li>
            <li>✔ 50GB Storage</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Choose Plan</button>
        </div>

        {/* Pricing Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-200 hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium</h3>
          <p className="text-gray-500 mb-4">For large businesses</p>
          <div className="text-3xl font-bold text-gray-800">$49.99<span className="text-sm font-normal">/mo</span></div>
          <ul className="mt-4 mb-6 space-y-2 text-gray-600">
            <li>✔ Unlimited Projects</li>
            <li>✔ 24/7 Support</li>
            <li>✔ 1TB Storage</li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Choose Plan</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
