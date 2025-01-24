import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Search, Video, Bell, User } from "lucide-react";
import {
  toggleSidebar,
  setSearchQuery,
  setSearchSuggestions,
} from "../store/slices/uiSlice";

function Header() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.ui.searchQuery);
  const searchSuggestions = useSelector((state) => state.ui.searchSuggestions);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  const handleSearchChange = useCallback(
    (e) => {
      const query = e.target.value;
      dispatch(setSearchQuery(query));

      if (query.trim()) {
        const suggestions = [
          `${query} tutorial`,
          `${query} music`,
          `${query} live`,
          `${query} official`,
          `${query} cover`,
        ];
        dispatch(setSearchSuggestions(suggestions));
      } else {
        dispatch(setSearchSuggestions([]));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !searchRef.current.contains(event.target)
      ) {
        dispatch(setSearchSuggestions([]));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-4 z-50">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center space-x-2">
          <Video className="text-red-600" size={28} />
          <span className="text-xl font-semibold">YouTube</span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-4 relative">
        <div className="flex">
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            className="w-full px-4 py-2 border rounded-l-full focus:outline-none focus:border-blue-500"
          />
          <button className="px-6 py-2 bg-gray-100 border border-l-0 rounded-r-full hover:bg-gray-200">
            <Search size={20} />
          </button>
        </div>

        {searchSuggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-50"
          >
            {searchSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  dispatch(setSearchQuery(suggestion));
                  dispatch(setSearchSuggestions([]));
                }}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
              >
                <Search size={16} className="mr-3 text-gray-500" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Video size={24} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell size={24} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <User size={24} />
        </button>
      </div>
    </header>
  );
}

export default Header;
