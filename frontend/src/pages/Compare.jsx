import { useEffect, useState } from "react";
import { fetchSheet } from "../services/api";

export default function Compare() {
    const [sheetData, setSheetData] = useState([]);
    const [dates, setDates] = useState(["", "", ""]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const positions = ["1st", "2nd", "3rd", "4th", "5th"];

    useEffect(() => {
        fetchSheet()
            .then(setSheetData)
            .finally(() => setLoading(false));
    }, []);

    const handleDateChange = (index, value) => {
        const updated = [...dates];
        updated[index] = value;
        setDates(updated);
    };

    const compareData = () => {
        const selectedDates = dates.filter(Boolean);
        if (selectedDates.length < 2) return;

        const filteredRows = sheetData.filter(row =>
            selectedDates.includes(row.Date)
        );




        /*
          map[number][date] = [{ slot, position }]
        */
        const map = {};

        filteredRows.forEach(row => {
            const { Date, Slot } = row;

            positions.forEach(pos => {
                row[pos]
                    ?.split("\n")
                    .map(n => n.trim())
                    .filter(Boolean)
                    .forEach(num => {
                        if (!map[num]) map[num] = {};
                        if (!map[num][Date]) map[num][Date] = [];
                        map[num][Date].push({
                            slot: Slot,
                            position: pos
                        });
                    });
            });
        });

        const output = [];

        Object.entries(map).forEach(([number, dateMap]) => {
            const appearedDates = Object.keys(dateMap);

            // 🔥 must appear in 2 or more selected dates
            if (appearedDates.length >= 2) {
                output.push({
                    Number: number,
                    Occurrences: appearedDates.map(date => ({
                        Date: date,
                        Details: dateMap[date]
                    }))
                });
            }
        });

        setResults(output);
    };

    const handleClear = () => {
        setDates(["", "", ""]);
        setResults([]);
    };

    if (loading) {
        return (
            <p className="text-center mt-10 text-blue-600 animate-pulse">
                Loading Data...
            </p>
        );
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [y, m, d] = dateStr.split("-");
        return `${d}-${m}-${y}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">
                Compare Date
            </h1>

            {/* 📅 Date Inputs */}
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow mb-6">
                <h2 className="font-semibold mb-4">
                    Select 2 or 3 Dates
                </h2>

                <div className="grid w-full grid-cols-1 sm:grid-cols-3 gap-4">
                    {dates.map((date, index) => (
                        <input
                            key={index}
                            type="date"
                            value={date}
                            onChange={e =>
                                handleDateChange(index, e.target.value)
                            }
                            className="border w-full px-4 py-2 rounded-lg"
                        />
                    ))}
                </div>

                <div className="mt-4 flex gap-4">
                    <button
                        onClick={compareData}
                        disabled={dates.filter(Boolean).length < 2}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                    >
                        Compare
                    </button>

                    <button
                        onClick={handleClear}
                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                        Clear
                    </button>
                </div>

            </div>

            {/* 📊 Comparison Result */}
            {results.length > 0 ? (
                <div className="max-w-6xl mx-auto space-y-6">
                    {results.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow p-5"
                        >
                            <h3 className="text-xl font-bold mb-3">
                                <span>{item.Number}</span>
                            </h3>

                            <div className="space-y-2">
                                {item.Occurrences.map((occ, i) => (
                                    <div
                                        key={i}
                                        className="text-sm bg-gray-100 rounded-lg p-3"
                                    >
                                        <b>{formatDate(occ.Date)}</b>
                                        <ul className="list-disc list-inside">
                                            {occ.Details.map((d, j) => (
                                                <li key={j}>
                                                    Slot {d.slot}, Position {d.position}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">
                    No repeated numbers found
                </p>
            )}
        </div>
    );
}
