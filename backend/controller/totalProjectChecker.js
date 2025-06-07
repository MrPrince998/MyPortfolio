const projectModal = require("../models/ProjectSchema");

const getDashboardCounts = async (req, res) => {
  try {
    const projectCount = await projectModal.countDocuments();
    const clientCount = await projectModal.countDocuments({
      isclientProject: true,
    });

    res.json({
      projectCount,
      clientCount,
    });
  } catch (error) {
    console.error("error fetching counts:", error);
    res.status(500).json({ message: "Error fetching counts" });
  }
};

module.exports = getDashboardCounts;
