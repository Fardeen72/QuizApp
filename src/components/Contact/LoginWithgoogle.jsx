import { useState, useRef, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {  auth ,db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import AuthModal from "@/components/AuthModel";

export default function NavbarProfile() {
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await auth.signOut();
    setOpen(false);
  };

  // Fetch user stats
  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          setStats(userSnap.data());
          console.log("Stats loaded:", userSnap.data());
        } else {
          console.log("No stats document found");
          setStats(null);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [user, open]); // Refetch when dropdown opens

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitial = () => {
    if (!user) return "U";
    if (user.displayName) return user.displayName[0].toUpperCase();
    if (user.email) return user.email[0].toUpperCase();
    return "U";
  };

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
    );
  }

  // ================= LOGGED IN =================
  if (user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200 hover:border-blue-500 bg-blue-600 text-white flex items-center justify-center font-semibold overflow-hidden transition-all duration-200"
          aria-label="User menu"
        >
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          ) : (
            <span className="text-lg">{getInitial()}</span>
          )}
        </button>

        {open && (
          <div className="fixed md:absolute right-0 top-0 md:top-auto md:mt-3 md:right-0 bottom-0 md:bottom-auto left-0 md:left-auto md:w-80 bg-white md:border-2 md:border-gray-200 md:rounded-xl md:shadow-lg z-50 overflow-y-auto md:overflow-hidden md:max-w-[calc(100vw-2rem)]">
            {/* Close button for mobile */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white flex-shrink-0" 
                    alt="Profile"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xl border-2 border-white flex-shrink-0">
                    {getInitial()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-blue-100 text-sm truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Content */}
            <div className="p-3 md:p-3">
              {/* Stats Section */}
              {stats && (
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-3">
                  <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Quiz Statistics
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">Completed</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {stats.quizzesCompleted || 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span className="text-sm text-gray-600">Attempted</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {stats.quizzesAttempted || 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span className="text-sm text-gray-600">Average Score</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {stats.averageScore || 0}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors duration-200 text-left group"
              >
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <span className="font-medium text-red-600">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= LOGGED OUT =================
  return (
    <>
      <button 
        onClick={() => setOpen(true)} 
        className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-500 bg-white hover:bg-gray-50 flex items-center justify-center transition-all duration-200"
        aria-label="Sign in"
      >
        <svg 
          className="w-6 h-6 text-gray-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        </svg>
      </button>

      {open && <AuthModal close={() => setOpen(false)} />}
    </>
  );
}