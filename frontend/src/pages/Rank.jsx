import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { fetchRank, fetchRankByPrefix } from "../services/api";
import { useNavigate } from "react-router-dom";


export default function Rank() {
    const [rankData, setRankData] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedRankData = localStorage.getItem("rankData");
        const storedSearchValue = localStorage.getItem("rankSearchValue");

        if (storedRankData && storedSearchValue) {
            setRankData(JSON.parse(storedRankData));
            setSearchValue(storedSearchValue);
            setSearched(true);
            setLoading(false);
        } else {
            loadAllRank();
        }

        const clearStorage = () => {
            localStorage.removeItem("rankData");
            localStorage.removeItem("rankSearchValue");
        };

        window.addEventListener("beforeunload", clearStorage);
        return () => window.removeEventListener("beforeunload", clearStorage);

    }, []);



    const [expanded, setExpanded] = useState({
        "1st": true,
        "2nd": true,
        "3rd": true,
        "4th": true,
        "5th": true,
    });

    const positions = ["1st", "2nd", "3rd", "4th", "5th"];



    const loadAllRank = async () => {
        try {
            setLoading(true);
            setError(null);
            setSearched(false);
            const data = await fetchRank();
            setRankData(data);
        } catch (err) {
            setError("Failed to load rank data");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (prefix) => {
        if (!prefix) return;

        try {
            setLoading(true);
            setError(null);
            setSearched(true);

            const data = await fetchRankByPrefix(prefix);
            setRankData(data);

            // 🔥 persist for back navigation
            localStorage.setItem("rankData", JSON.stringify(data));
            localStorage.setItem("rankSearchValue", prefix);
        } catch (err) {
            setError("Failed to load prefix rank data");
        } finally {
            setLoading(false);
        }
    };


    const handleClearSearch = () => {
        setSearchValue("");
        setSearched(false);
        setRankData({});

        localStorage.removeItem("rankData");
        localStorage.removeItem("rankSearchValue");

        loadAllRank();
    };


    // 🔽 Toggle expand/collapse
    const toggleExpand = (pos) => {
        setExpanded((prev) => ({
            ...prev,
            [pos]: !prev[pos],
        }));
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">
                Rank Analysis
            </h1>

            <div className="max-w-2xl mx-auto">
                <SearchBar
                    value={searchValue}
                    setValue={setSearchValue}
                    onSearch={handleSearch}
                    placeholder="Search prefix (e.g. 04)"
                />
            </div>

            {searched && (
                <button
                    onClick={handleClearSearch}
                    className="mt-4 block mx-auto text-sm text-blue-600 hover:underline"

                >
                    Clear Search
                </button>
            )}

            {loading ? (
                <p className="text-center mt-10 text-blue-600 animate-pulse">
                    Loading rank data...
                </p>
            ) : error ? (
                <p className="text-center mt-10 text-red-500">
                    {error}
                </p>
            ) : (
                <div className="mt-8 space-y-6 max-w-7xl mx-auto">
                    {positions.map((pos) => (
                        <div
                            key={pos}
                            className="bg-white rounded-xl shadow p-5"
                        >
                            {/* 🔹 Header with toggle */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-700">
                                    {pos} Position
                                </h2>

                                <button
                                    onClick={() => toggleExpand(pos)}
                                    className="text-blue-600 font-semibold hover:underline"
                                >
                                    {expanded[pos] ? "▲" : "▼"}
                                </button>
                            </div>

                            {/* 🔹 Collapsible Content */}
                            {expanded[pos] && (
                                <>
                                    {!rankData[pos] || rankData[pos].length === 0 ? (
                                        <p className="text-gray-500">
                                            No repeated numbers
                                        </p>
                                    ) : (
                                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 gap-4">
                                            {rankData[pos].map((item, index) => (
                                                <div
                                                    onClick={() => navigate(`/details/${item.Number}`)}
                                                    key={index}
                                                    className="bg-gray-100 rounded-lg p-3 text-center hover:shadow transition"
                                                >
                                                    {/* Smaller on mobile, bigger on sm+ */}
                                                    <div className="font-mono font-semibold text-sm sm:text-lg">
                                                        {item.Number}
                                                    </div>

                                                    {/* Smaller on mobile */}
                                                    <div className="text-xs sm:text-sm text-gray-600">
                                                        Count: {item.Count}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
