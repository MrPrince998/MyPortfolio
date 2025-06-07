const AdminLogin = require("../models/AdminLogin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// You should store this secret in env file in production
const JWT_SECRET = process.env.JWT_SECRET;

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminLogin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new AdminLogin({ email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};
