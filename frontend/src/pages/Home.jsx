import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ResultGrid from "../components/ResultGrid";
import RecentResultsTable from "../components/RecentResultsTable";
import { searchNumbers, fetchSheet } from "../services/api";

export default function Home() {
  const [results, setResults] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentLoading, setRecentLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [prefix, setPrefix] = useState("");

  useEffect(() => {
    // 🔹 Load recent table with loading
    setRecentLoading(true);
    fetchSheet()
      .then(setRecent)
      .finally(() => setRecentLoading(false));

    // 🔹 Restore search state (Back navigation)
    const storedResults = localStorage.getItem("searchResults");
    const storedPrefix = localStorage.getItem("searchPrefix");

    if (storedResults && storedPrefix) {
      setResults(JSON.parse(storedResults));
      setPrefix(storedPrefix);
      setHasSearched(true);
    }

    // 🔹 Cleanup on refresh/close
    const clearStorage = () => {
      localStorage.removeItem("searchResults");
      localStorage.removeItem("searchPrefix");
    };

    window.addEventListener("beforeunload", clearStorage);
    return () => window.removeEventListener("beforeunload", clearStorage);
  }, []);

  const handleSearch = async (value) => {
    if (!value) return;

    setLoading(true);
    setHasSearched(true);
    setPrefix(value);

    const data = await searchNumbers(value);
    setResults(data);

    localStorage.setItem("searchResults", JSON.stringify(data));
    localStorage.setItem("searchPrefix", value);

    setLoading(false);
  };

 

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 flex flex-col items-center">
      {/* <h1 className="text-3xl font-bold mb-6">DN - DIRECTOR</h1> */}

      <SearchBar
        value={prefix}
        setValue={setPrefix}
        onSearch={handleSearch}
      />

       
        
      


      {loading && (
        <p className="mt-4 text-blue-600 animate-pulse">
          Searching...
        </p>
      )}


      {hasSearched && <ResultGrid results={results} />}

      {!hasSearched && (
        <RecentResultsTable
          data={recent}
          loading={recentLoading}
        />
      )}
    </div>
  );
}
