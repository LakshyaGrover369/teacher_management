import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  placeholder = "Search teachers...",
}: SearchBarProps) {
  return (
    <div className="relative rounded-md shadow-sm mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        type="text"
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 py-3 sm:text-sm border-gray-300 rounded-md"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setSearchTerm("")}
        >
          <span className="text-gray-400 hover:text-gray-500">×</span>
        </button>
      )}
    </div>
  );
}
