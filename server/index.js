require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Bug = require("./models/Bug");
const auth = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Auth routes
app.post("/api/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Bug routes
app.post("/api/bugs", auth, async (req, res) => {
  try {
    const bug = new Bug({
      ...req.body,
      createdBy: req.userId,
    });
    await bug.save();
    res.status(201).json(bug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/bugs", auth, async (req, res) => {
  try {
    const bugs = await Bug.find({ createdBy: req.userId });
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/bugs/:id", auth, async (req, res) => {
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
});

app.patch("/api/bugs/:id", auth, async (req, res) => {
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
});

app.delete("/api/bugs/:id", auth, async (req, res) => {
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
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
