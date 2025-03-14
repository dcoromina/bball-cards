import { useState } from "react";
import { supabase } from "../app/supabaseClient";
import { useRouter } from "next/navigation";

export default function MainInfo() {
  const router = useRouter();

  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogout = async () => {
    // Sign out the user using Supabase
    await supabase.auth.signOut();

    // Optionally redirect to the login page after logout
    router.push("/signin");
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 items-center justify-between p-4 flex flex-row shadow-md">
      <div className="bg-white text-gray-800 py-2 px-4 rounded-lg shadow-md flex items-center">
        <div className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-indigo-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
            <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          </svg>
        </div>
        <span className="font-medium">Cards Collected: </span>
        <span className="ml-1 font-bold text-indigo-600">85/253</span>
      </div>

      <div
        onClick={() => setLogoutModal(!logoutModal)}
        className="rounded-full bg-white p-2 shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>

      {logoutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setLogoutModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-64 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Account Options
            </h3>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7z"
                  clipRule="evenodd"
                />
                <path d="M4 8a1 1 0 011-1h4a1 1 0 110 2H5a1 1 0 01-1-1z" />
              </svg>
              Logout
            </button>
            <button
              onClick={() => setLogoutModal(false)}
              className="w-full mt-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
