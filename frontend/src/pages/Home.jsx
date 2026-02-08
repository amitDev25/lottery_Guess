import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ResultGrid from "../components/ResultGrid";
import RecentResultsTable from "../components/RecentResultsTable";
import { searchNumbers, fetchSheet } from "../services/api";

export default function Home() {
  const [results, setResults] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [prefix, setPrefix] = useState("");

  useEffect(() => {
    // 🔹 Load recent table
    fetchSheet().then(setRecent);

    // 🔹 Restore search state (for Back navigation)
    const storedResults = localStorage.getItem("searchResults");
    const storedPrefix = localStorage.getItem("searchPrefix");

    if (storedResults && storedPrefix) {
      setResults(JSON.parse(storedResults));
      setPrefix(storedPrefix);
      setHasSearched(true);
    }
  }, []);

  const handleSearch = async (value) => {
    if (!value) return;

    setLoading(true);
    setHasSearched(true);
    setPrefix(value);

    const data = await searchNumbers(value);
    setResults(data);

    // 🔹 Save for back navigation
    localStorage.setItem("searchResults", JSON.stringify(data));
    localStorage.setItem("searchPrefix", value);

    setLoading(false);
  };
  window.addEventListener("beforeunload", () => {
  localStorage.removeItem("searchResults");
  localStorage.removeItem("searchPrefix");
});

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Lottery Number Search</h1>

      <SearchBar value={prefix} setValue={setPrefix} onSearch={handleSearch} />

      {loading && <p className="mt-4 text-blue-600">Searching...</p>}

      {hasSearched && <ResultGrid results={results} />}

      {!hasSearched && <RecentResultsTable data={recent} />}
    </div>
  );

  
}
