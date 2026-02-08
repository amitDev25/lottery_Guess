import { useNavigate } from "react-router-dom";

export default function RecentResultsTable({ data }) {
    const navigate = useNavigate();

    function formatDate(dateStr) {
        if (!dateStr) return "";
        const [y, m, d] = dateStr.split("-");
        return `${d}-${m}-${y}`;
    }


    return (
        <div className="mt-10 bg-white rounded-xl shadow w-full lg:w-2/3">
            <h2 className="text-xl font-bold px-6 py-4 bg-gray-100">
                Recent Results
            </h2>

            {/* 🔽 Scroll wrapper */}
            <div className="w-full overflow-x-auto max-h-screen overflow-y-auto">
                <table className="min-w-full">
                    <thead className="bg-blue-600 text-white sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-left">Sl No</th>
                            <th className="px-4 py-3 text-left">Slot</th>
                            <th className="px-4 py-3 text-left">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                onClick={() =>
                                    navigate(`/result/${row.Date}/${row.Slot}`)
                                }
                                className="cursor-pointer border-b hover:bg-gray-50"
                            >
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3 font-semibold">{row.Slot}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    {formatDate(row.Date)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
