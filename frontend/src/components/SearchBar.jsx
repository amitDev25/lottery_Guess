export default function SearchBar({ value, setValue, onSearch }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 w-full max-w-xl mx-auto"
    >
      <input
        type="text"
        placeholder="Enter the number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
