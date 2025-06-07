const express = require("express");
const router = express.Router();
const getDashboardCounts = require("../controller/totalProjectChecker");

// GET /api/dashboard
router.get("/", getDashboardCounts);

module.exports = router;
