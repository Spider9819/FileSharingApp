import { FiSearch } from "react-icons/fi";

function SearchBar({ search, setSearch }) {
  return (
    <div className="relative">

      <FiSearch className="absolute left-4 top-4 text-slate-400" />

      <input
        type="text"
        placeholder="Search Files..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-5 text-white focus:border-blue-500 outline-none"
      />

    </div>
  );
}

export default SearchBar;   