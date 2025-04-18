"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function EntrepreneurDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    jobRole: "",
    description: "",
    skills: "",
    duration: "",
    stipend: "",
    openings: "",
  });

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const entrepreneurEmail = localStorage.getItem("email");
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          entrepreneurEmail,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create post");

      alert("Post created successfully!");
      setShowForm(false);
      setFormData({
        jobRole: "",
        description: "",
        skills: "",
        duration: "",
        stipend: "",
        openings: "",
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchApplications = async () => {
    const entrepreneurEmail = localStorage.getItem("email");
    try {
      const res = await fetch(
        `http://localhost:5000/api/applications/by-entrepreneur/${entrepreneurEmail}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch applications");

      setApplications(data);
      setShowApplications(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const updateStatus = async (applicationId, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/applications/${applicationId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update status");

      fetchApplications(); // Refresh the list
    } catch (err) {
      alert(err.message);
    }
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
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </nav>

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
          {/* Post a Startup Idea */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Post a Startup Idea
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              Share your idea and recruit passionate students.
            </p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
            >
              {showForm ? "Close Form" : "Create Post"}
            </button>

            {showForm && (
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleChange}
                  placeholder="Job Role"
                  required
                  className="w-full p-2 border rounded"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Skills Required"
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  name="stipend"
                  value={formData.stipend}
                  onChange={handleChange}
                  placeholder="Stipend"
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  name="openings"
                  type="number"
                  value={formData.openings}
                  onChange={handleChange}
                  placeholder="No. of Openings"
                  required
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Submit
                </button>
              </form>
            )}
          </div>

          {/* Manage Applications */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Manage Applications
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              View, accept, or reject applicants.
            </p>
            <button
              onClick={fetchApplications}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
            >
              View Applications
            </button>

            {showApplications && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-2">
                  Received Applications:
                </h3>
                {applications.length === 0 ? (
                  <p className="text-sm text-neutral-500">No applications yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {applications.map((app, index) => (
                      <li
                        key={index}
                        className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-md text-sm text-neutral-900 dark:text-white flex justify-between items-center"
                      >
                        <div>
                          📧 {app.studentEmail} —{" "}
                          <span className="italic text-neutral-500">({app.jobRole})</span>
                          <br />
                          <span className="text-xs text-neutral-400">
                            Status:{" "}
                            <span
                              className={`${
                                app.status === "Accepted"
                                  ? "text-green-500"
                                  : app.status === "Rejected"
                                  ? "text-red-500"
                                  : "text-yellow-500"
                              }`}
                            >
                              {app.status || "Pending"}
                            </span>
                          </span>
                        </div>
                        {app.status !== "Accepted" && app.status !== "Rejected" && (
                          <div className="flex space-x-2">
                            <button
                              className="px-2 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded"
                              onClick={() => updateStatus(app._id, "Accepted")}
                            >
                              Accept
                            </button>
                            <button
                              className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded"
                              onClick={() => updateStatus(app._id, "Rejected")}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
