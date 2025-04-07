const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const allowedDomains = ["@srm.edu", "@vit.edu", "@iiit.ac.in"];

const isCollegeEmail = (email) => {
  return allowedDomains.some((domain) => email.endsWith(domain));
};

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (role === "student" && !isCollegeEmail(email)) {
      return res.status(400).json({ message: "Students must use a college email" });
    }

    if (role === "entrepreneur" && isCollegeEmail(email)) {
      return res.status(400).json({ message: "Entrepreneurs must use a personal email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (user.role !== role) {
      console.log("DB Role:", user.role, "Requested Role:", role); // Add this line
      return res.status(400).json({ message: "Email does not match the selected role." });
    }
    
    if (role === "student" && !isCollegeEmail(email)) {
      return res.status(400).json({ message: "Students must use a college email" });
    }

    if (role === "entrepreneur" && isCollegeEmail(email)) {
      return res.status(400).json({ message: "Entrepreneurs must use a personal email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
