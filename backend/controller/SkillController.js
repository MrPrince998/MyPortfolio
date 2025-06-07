const Skill = require("../models/SkillSchema");

// Create a new skill
exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single skill by ID
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update skill by ID
exports.updateSkill = async (req, res) => {
  try {
    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete skill by ID
exports.deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
