import { useState } from "react";
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };
  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
        className="p-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="px-5 py-3 bg-blue-600 text-white rounded-full hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
       Search
      </button>
    </div>
  );
};

export default SearchBar;
