import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setSearchSuggestions } from "../store/slices/uiSlice";

const Typeahead = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.ui.searchQuery);
  const searchSuggestions = useSelector((state) => state.ui.searchSuggestions);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      // Simulate API call to fetch suggestions (replace with actual API call)
      const fetchSuggestions = async () => {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
            searchQuery
          )}&key=YOUR_API_KEY`
        );
        const data = await response.json();
        const suggestions = data.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
        }));

        dispatch(setSearchSuggestions(suggestions));
      };

      fetchSuggestions();
    } else {
      // Clear suggestions if search query is empty
      dispatch(setSearchSuggestions([]));
    }
  }, [searchQuery, dispatch]);

  const handleSearchInput = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSelectSuggestion = (suggestion) => {
    // Handle selecting a suggestion (e.g., navigate to video page)
    console.log("Selected Suggestion:", suggestion);
    dispatch(setSearchQuery(suggestion.title)); // Update search query with selected suggestion
    dispatch(setSearchSuggestions([])); // Clear suggestions
    setIsFocused(false);
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay hiding suggestions to allow click
        placeholder="Search..."
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
      />

      {/* Suggestions Dropdown */}
      {isFocused && searchSuggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-2 w-full z-10">
          {searchSuggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Typeahead;
