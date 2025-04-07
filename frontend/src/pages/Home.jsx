import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800 px-4">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-blue-800 leading-tight">
          🚀 Connect Students with Startup Ideas
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600 font-medium">
          A platform where college students can explore internship opportunities
          from real entrepreneurs building real startups.
        </p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex gap-6"
      >
        <Link
          to="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="border border-blue-600 text-blue-600 hover:bg-blue-100 font-semibold py-3 px-6 rounded-xl transition duration-300"
        >
          Login
        </Link>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-20 text-center max-w-3xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Why Join?</h2>
        <ul className="text-gray-700 space-y-3 text-left text-base md:text-lg font-medium leading-relaxed">
          <li>✅ College Email Based Registration</li>
          <li>✅ Browse and Apply for Relevant Opportunities</li>
          <li>✅ Filter by Skills, Stipend, and Duration</li>
          <li>✅ Entrepreneurs Can Manage Applications Easily</li>
        </ul>
      </motion.section>
    </main>
  );
}
