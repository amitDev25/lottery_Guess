import { useNavigate } from "react-router-dom";

export default function ResultCard({ number, count }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/details/${number}`)}
      className="bg-white rounded-xl shadow-md p-3 text-center cursor-pointer
                 hover:shadow-xl hover:scale-105 transition"
    >
      <div className="text-2xl font-bold text-blue-600">{number}</div>
      <div className="mt-2 text-gray-600">Count: {count}</div>
    </div>
  );
}
