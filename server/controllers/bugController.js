// controllers/bugController.js
import Bug from "../models/Bug.js";

export const createBug = async (req, res) => {
  try {
    const bug = new Bug({ ...req.body, createdBy: req.userId });
    await bug.save();
    res.status(201).json(bug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBug = async (req, res) => {
  try {
    const bug = await Bug.findOne({
      _id: req.params.id,
      createdBy: req.userId,
    });
    if (!bug) return res.status(404).json({ message: "Bug not found" });
    res.json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      req.body,
      { new: true }
    );
    if (!bug) return res.status(404).json({ message: "Bug not found" });
    res.json(bug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId,
    });
    if (!bug) return res.status(404).json({ message: "Bug not found" });
    res.json({ message: "Bug deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
