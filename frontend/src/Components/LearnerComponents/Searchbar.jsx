import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
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
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
        className="p-3 border shadow-lg border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="flex items-center gap-2 px-5 py-3 shadow-lg bg-gradient-to-tr from-cyan-600 to-indigo-300  text-white rounded-full hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <FaMagnifyingGlass />    
       Search
      </button>
    </div>
  );
};

export default SearchBar;
