"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function StudentDashboard() {
  const [showPosts, setShowPosts] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const handleBrowseClick = () => {
    setShowPosts(!showPosts);
    if (!showPosts) fetchPosts();
  };

  const handleApply = async (postId) => {
    const studentEmail = localStorage.getItem("email");

    if (!studentEmail) {
      alert("❌ Please login again. Email not found.");
      return;
    }

    const applicationData = {
      postId,
      studentEmail,
    };

    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error("Server did not return JSON. Response: " + text);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Application failed");
      }

      alert("✅ Application submitted successfully!");
    } catch (err) {
      console.error("❌ Error submitting application:", err);
      alert(`❌ ${err.message}`);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white dark:bg-zinc-900 shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">InternConnect</h1>
        <div className="flex items-center space-x-4">
          <span className="text-neutral-800 dark:text-neutral-200 font-medium">
            👩‍🎓 Student Profile
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
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
          Hello, Student 👩‍🎓
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Browse Posts */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Browse Opportunities
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              Explore startup internships based on your skills and interests.
            </p>
            <button
              onClick={handleBrowseClick}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
            >
              {showPosts ? "Hide Opportunities" : "Browse"}
            </button>

            {showPosts && (
              <div className="mt-6 space-y-4">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div
                      key={post._id}
                      className="border border-gray-300 dark:border-zinc-800 rounded-lg p-4"
                    >
                      <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
                        {post.role}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        {post.description}
                      </p>
                      <p className="text-sm mt-2">
                        <strong>Skills:</strong> {post.skills}
                      </p>
                      <p className="text-sm">
                        <strong>Duration:</strong> {post.duration}
                      </p>
                      <p className="text-sm">
                        <strong>Stipend:</strong> ₹{post.stipend}
                      </p>
                      <p className="text-sm">
                        <strong>Openings:</strong> {post.openings}
                      </p>
                      <button
                        onClick={() => handleApply(post._id)}
                        className="mt-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-600 dark:text-neutral-300">
                    No posts found.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* My Applications */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
              My Applications
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              Track the status of your internship applications.
            </p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
              Check Status
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
