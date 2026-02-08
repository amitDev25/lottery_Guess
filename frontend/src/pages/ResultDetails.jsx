import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSheet } from "../services/api";

export default function ResultDetails() {
  const { date, slot } = useParams();
  const navigate = useNavigate();
  const [row, setRow] = useState(null);

  useEffect(() => {
    fetchSheet().then(data => {
      const found = data.find(
        r => r.Date === date && r.Slot === slot
      );
      setRow(found);
    });
  }, [date, slot]);

  if (!row) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 mb-4"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold mb-4">
          Result Details
        </h1>

        <p className="mb-2"><b>Date:</b> {row.Date}</p>
        <p className="mb-4"><b>Slot:</b> {row.Slot}</p>

        {["1st", "2nd", "3rd", "4th", "5th"].map(col => (
          <div key={col} className="mb-4">
            <h3 className="font-semibold mb-1">{col}</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              {row[col]}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
