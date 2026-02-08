import ResultCard from "./ResultCard";

export default function ResultGrid({ results }) {
  if (!results.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No results found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-8 gap-6 mt-8">
      {results.map((item) => (
        <ResultCard
          key={item.Number}
          number={item.Number}
          count={item.Count}
        />
      ))}
    </div>
  );
}
