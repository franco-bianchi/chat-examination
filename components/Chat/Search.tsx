import { useState } from "react";

export function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  const handleSubmit = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="bg-gradient-to-r from-green-500 to-teal-500 shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-white">Examination Chat</h1>
      <form className="flex items-center">
        <div className={!isOpen ? "hidden" : ""}>
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="simple-search"
              className="border text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full ps-5 p-2.5  text-black bg-white"
              placeholder="Search message"
              value={searchText}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          type="button"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-600 rounded-lg border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
    </header>
  );
}
