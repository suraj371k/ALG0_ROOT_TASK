import { useState } from "react";
import { 
  FiHome, 
  FiUser, 
  FiSettings, 
  FiDatabase, 
  FiBarChart2, 
  FiMail, 
  FiCalendar,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Details');
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { name: 'Dashboard', icon: <FiHome /> },
    { name: 'Details', icon: <FiDatabase /> },
    { name: 'Users', icon: <FiUser /> },
    { name: 'Analytics', icon: <FiBarChart2 /> },
    { name: 'Messages', icon: <FiMail /> },
    { name: 'Calendar', icon: <FiCalendar /> },
    { name: 'Settings', icon: <FiSettings /> },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={`
        bg-gradient-to-b from-gray-800 to-gray-900 text-white 
        h-full flex flex-col transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
        shadow-xl
      `}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && (
          <h2 className="text-xl font-bold whitespace-nowrap">Admin Panel</h2>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-700 transition-all duration-200"
        >
          {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </button>
      </div>

      <ul className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <li 
            key={item.name}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`
              mx-2 my-1 rounded-lg transition-all duration-200
              ${activeItem === item.name ? 'bg-blue-600' : 'hover:bg-gray-700'}
              ${isCollapsed ? 'p-3 flex justify-center' : 'p-3 flex items-center'}
            `}
            onClick={() => setActiveItem(item.name)}
          >
            <div className="relative">
              <span className={`text-lg ${isCollapsed ? '' : 'mr-3'}`}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="whitespace-nowrap">{item.name}</span>
              )}
              
              {isCollapsed && hoveredItem === item.name && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded shadow-lg z-50 whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className={`
        p-4 border-t border-gray-700 flex items-center 
        ${isCollapsed ? 'justify-center' : ''}
        transition-all duration-200
      `}>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <FiUser size={20} />
        </div>
        {!isCollapsed && (
          <div className="ml-3 overflow-hidden">
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;