import React from "react";
import { useSelector } from "react-redux";
import {
  Home,
  Compass,
  Clock,
  ThumbsUp,
  PlaySquare,
  History,
  Film,
  Gamepad,
  Newspaper,
  Music2,
  Radio,
  Trophy,
} from "lucide-react";

function Sidebar() {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  const menuItems = [
    { icon: <Home size={20} />, text: "Home" },
    { icon: <Compass size={20} />, text: "Explore" },
    { icon: <History size={20} />, text: "History" },
    { icon: <PlaySquare size={20} />, text: "Your videos" },
    { icon: <Clock size={20} />, text: "Watch later" },
    { icon: <ThumbsUp size={20} />, text: "Liked videos" },
  ];

  const categories = [
    { icon: <Film size={20} />, text: "Movies" },
    { icon: <Gamepad size={20} />, text: "Gaming" },
    { icon: <Newspaper size={20} />, text: "News" },
    { icon: <Music2 size={20} />, text: "Music" },
    { icon: <Radio size={20} />, text: "Live" },
    { icon: <Trophy size={20} />, text: "Sports" },
  ];

  const sidebarClasses = `fixed left-0 top-16 bg-white h-screen overflow-y-auto transition-all duration-300 ${
    sidebarOpen
      ? "w-64 translate-x-0"
      : "w-64 -translate-x-full md:translate-x-0"
  }`;

  return (
    <aside className={sidebarClasses}>
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center space-x-4 hover:bg-gray-100 w-full p-2 rounded-lg"
            >
              {item.icon}
              <span>{item.text}</span>
            </button>
          ))}
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2 text-lg">Categories</h3>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className="flex items-center space-x-4 hover:bg-gray-100 w-full p-2 rounded-lg"
              >
                {category.icon}
                <span>{category.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
