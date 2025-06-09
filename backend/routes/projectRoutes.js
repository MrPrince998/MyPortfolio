const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadImage");
const {
  createProject,
  getProjects,
  getProjectById,
  DeleteProductById
} = require("../controller/projectController");
const verifyToken = require("../middleware/checkTokenMiddleware");

// Create new project with image upload
router.post("/", verifyToken , upload.single("image"), createProject);

// Get all projects
router.get("/", getProjects);

// Get a single project by ID
router.get("/:id", getProjectById);

// delete single product by id
router.delete("/:id", DeleteProductById);



module.exports = router;
