const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const EPHRoutes = require("./routes/EPHRoutes");
const emailRoute = require("./routes/email");
const projectRoutes = require("./routes/projectRoutes");
const adminRoutes = require("./routes/adminRoutes");
const totalProjectCheckerRoutes = require("./routes/totalProjectCheckerRoutes");
const skillRoutes = require("./routes/skillRoutes")

const app = express();
const PORT = process.env.PORT || 8000;

// inbuild express middleware
app.use(express.json());
app.use(cors());

// static file handler
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/projects", projectRoutes);
app.use("/api", EPHRoutes);
app.use("/api/email", emailRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/totalProjects", totalProjectCheckerRoutes);
app.use("/api/skills", skillRoutes);

// connection to MongoDB atlas
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
    console.log("DataBase Connected!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
