"use client";
import React from "react";
import { motion } from "framer-motion";

export default function EntrepreneurDashboard() {
  const handleLogout = () => {
    // Clear tokens/localStorage if any and redirect to login
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white dark:bg-zinc-900 shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">InternConnect</h1>
        <div className="flex items-center space-x-4">
          <span className="text-neutral-800 dark:text-neutral-200 font-medium">
            🧑‍💼 Entrepreneur Profile
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <motion.div
        className="max-w-6xl mx-auto p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
          Welcome, Entrepreneur 🚀
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition-all">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Post a Startup Idea
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              Share your idea and recruit passionate students with the right skills.
            </p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all">
              Create Post
            </button>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition-all">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Manage Applications
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              View, accept, or reject applicants. Your next teammate could be here!
            </p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all">
              View Applications
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
