import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout, deleteAccount } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative z-10">
      <h1 className="text-xl md:text-2xl font-bold tracking-tight transition-all duration-300 hover:scale-105">
        Dashboard
      </h1>

      <div className="relative">
        {user ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              <div className="w-8 h-8 cursor-pointer flex items-center justify-center">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg">👤</span>
                )}
              </div>
            </button>

            {dropdownOpen && (
              <div 
                className="fixed md:absolute right-4 mt-2 w-56 bg-white border border-gray-200 shadow-xl rounded-lg p-2 z-50 transform transition-all duration-200 origin-top-right"
                style={{ top: 'calc(100% + 0.5rem)' }}
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={logout}
                    className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-150 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                  <button
                    onClick={deleteAccount}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer hover:text-red-800 transition-colors duration-150 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;