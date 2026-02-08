export default function SearchBar({ value, setValue, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

   const handleRefresh = () => {
    window.location.reload();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full 
        max-w-xl 
        mx-auto 
        flex 
        flex-col 
        gap-3 
        sm:flex-row
      "
    >
      <input
        type="text"
        placeholder="Enter the number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="
          w-full 
          sm:flex-1
          px-4 
          py-3 
          rounded-lg 
          border 
          text-lg
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500
        "
      />

      <button
        type="submit"
        className="
          w-full 
          sm:w-auto
          px-6 
          py-3 
          rounded-lg 
          bg-blue-600 
          text-white 
          font-semibold 
          hover:bg-blue-700 
          transition
        "
      >
        Search
      </button>

      <button
                onClick={handleRefresh}
                className="w-full 
                sm:w-auto
                px-6 
                py-3 
                rounded-lg 
                bg-blue-600 
                text-white 
                font-semibold 
                hover:bg-blue-700 
                transition"
              >
                Refresh
              </button>
    </form>
  );
}
