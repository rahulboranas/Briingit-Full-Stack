import React from "react";

const OfflineStore = () => {
  return (
    <section className="min-h-screen bg-orange-50 py-12 px-4">
      
      {/* ---------- PAGE HEADER ---------- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-orange-700">
          Our Offline Store Connection
        </h1>
        <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
          Briingit is proudly connected with **300+ stationery stores** across 
          Virar, Vasai & Nallasopara.  
          We supply a wide range of premium stationery & writing materials to our network.
        </p>
      </div>

      {/* ---------- MAIN STORE CARD ---------- */}
      <div
        className="
          max-w-3xl mx-auto bg-white 
          p-8 rounded-2xl shadow-lg
          border border-orange-200
        "
      >
        <h2 className="text-2xl font-bold text-orange-600 mb-2">
          SHREE CHAMUNDA STATIONARY & PAPER
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Wholesaler of all types of stationery, xerox paper, registers, white boards,
          writing supplies, and classroom essentials.
        </p>

        <div className="mt-5">
          <h3 className="font-semibold text-orange-700 text-lg">Address:</h3>
          <p className="text-gray-800">
            Shop No. 8, Balaji Shopping Center,  
            Gawad Wadi, Virar (East) – 401305
          </p>
        </div>
      </div>

      {/* ---------- OTHER AREAS WE SERVE ---------- */}
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-bold text-orange-700 mb-3">
          Our Offline Presence
        </h3>

        <p className="text-gray-700">
          We currently operate and supply to stores in:
        </p>

        <ul className="list-disc ml-5 mt-2 text-gray-800">
          <li>Virar East</li>
          <li>Virar West</li>
          <li>Nallasopara East</li>
          <li>Vasai–Virar Region (300+ stores connected)</li>
        </ul>
      </div>

      {/* ---------- NOTE ---------- */}
      <p className="text-center mt-10 text-gray-600 text-sm">
        *This is only our primary registered offline store.  
      </p>
    </section>
  );
};

export default OfflineStore;

