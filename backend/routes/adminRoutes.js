const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

router.post("/login", adminController.adminLogin);
router.post("/register", adminController.registerAdmin);

module.exports = router;
