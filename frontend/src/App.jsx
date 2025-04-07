
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EntrepreneurDashboard from "./pages/Dashboard/EntrepreneurDashboard";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import "./index.css";
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/entrepreneur-dashboard" element={<EntrepreneurDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}
