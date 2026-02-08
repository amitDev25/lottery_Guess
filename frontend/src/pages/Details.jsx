import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDetails } from "../services/api";

export default function Details() {
  const { number } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchDetails(number)
      .then(setRows)
      .finally(() => setLoading(false));
  }, [number]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold mb-6">
          Details for Number: <span className="text-blue-600">{number}</span>
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Sl No</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Slot</th>
                  <th className="px-4 py-3 text-left">Position</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{row.Date}</td>
                    <td className="px-4 py-3 font-semibold">{row.Slot}</td>
                    <td className="px-4 py-3">{row.Column}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && rows.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No data found
          </p>
        )}
      </div>
    </div>
  );
}
