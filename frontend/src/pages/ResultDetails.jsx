import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSheet } from "../services/api";

export default function ResultDetails() {
  const { date, slot } = useParams();
  const navigate = useNavigate();
  const [row, setRow] = useState(null);

  useEffect(() => {
    fetchSheet().then((data) => {
      const found = data.find(
        (r) => r.Date === date && r.Slot === slot
      );
      setRow(found);
    });
  }, [date, slot]);

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}-${m}-${y}`;
  }

  function splitNumbers(value) {
    if (!value) return [];
    return value
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);
  }

  if (!row) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading result...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* 🔙 Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 mb-4 hover:underline"
        >
          ← Back
        </button>

        {/* 🧾 Header */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Result Details
          </h1>

          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
              📅 Date: {formatDate(row.Date)}
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
              🕒 Slot: {row.Slot}
            </span>
          </div>
        </div>

        {/* 🧮 Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["1st", "2nd", "3rd", "4th", "5th"].map((col) => (
            <div
              key={col}
              className="bg-white rounded-xl shadow p-5 flex flex-col"
            >
              <h3 className="text-lg font-bold mb-4 text-gray-700">
                {col} Prize
              </h3>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto">
                {splitNumbers(row[col]).map((num, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 text-center bg-gray-100 rounded-lg font-mono text-sm hover:bg-blue-100 transition"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
