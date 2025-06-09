const Project = require("../models/ProjectSchema");

// Create a new project
const createProject = async (req, res) => {
  try {
    const { title, description, projectLink, status, isClientProject } =
      req.body;
    const image = req.file
      ? `/api/uploads/projectImage/${req.file.filename}`
      : null;

    if (!title || !description || !image) {
      return res
        .status(400)
        .json({ message: "Title, description, and image are required." });
    }
    const project = new Project({
      title,
      description,
      image,
      projectLink,
      status,
      isClientProject,
    });

    await project.save();

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product by id
const DeleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  DeleteProductById,
};
