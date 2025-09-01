import { useState } from "react";
import { supabase } from "../app/supabaseClient";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function MainInfo() {
  const router = useRouter();
  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-nba-blue via-indigo-800 to-purple-900 p-6 shadow-2xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Cards Collection Info */}
        <motion.div
          className="glass rounded-2xl p-4 shadow-xl border border-white/20"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-championship-gold to-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                  <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-mvp-purple rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">!</span>
              </div>
            </div>
            <div className="text-white">
              <p className="text-sm font-medium text-white/80">
                Cards Collected
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">85</span>
                <span className="text-lg text-white/60">/ 253</span>
              </div>
              <div className="w-32 h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-championship-gold to-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "33.6%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Profile Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <motion.button
            className="relative p-3 glass rounded-xl hover:bg-white/20 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5zM4 19h6a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </span>
          </motion.button>

          {/* User Avatar */}
          <motion.button
            onClick={() => setLogoutModal(true)}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
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
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </motion.button>
        </div>
      </div>

      {/* Logout Modal */}
      <AnimatePresence>
        {logoutModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLogoutModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 w-80 max-w-sm mx-4"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Sign Out
                </h3>
                <p className="text-gray-600 text-sm">
                  Are you sure you want to sign out of your account?
                </p>
              </div>

              <div className="space-y-3">
                <motion.button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Yes, Sign Out
                </motion.button>
                <motion.button
                  onClick={() => setLogoutModal(false)}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
