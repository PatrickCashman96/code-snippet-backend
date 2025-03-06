const express = require("express");
const router = express.Router();
const Snippet = require("../models/Snippet.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// POST /api/snippets - Create snippet (protected)
router.post("/snippets", isAuthenticated, async (req, res, next) => {
  const {title, code, language, tags} = req.body;
  try {
      if (!title || !code || !language) return res.status(400).json({ message: "Title, code, and language are required" });
      const snippet = await Snippet.create({
          title,
          code,
          language,
          tags: tags || [],
          createdBy: req.payload._id
      });
      res.status(201).json(snippet);
  } catch (error) {
      next(error);
  }
});

// GET /api/snippets - List all snippets 
router.get("/snippets", async (req, res, next) => {
  try {
      const snippet = await Snippet.find().populate("createdBy", "name");
      res.json(snippet);
  } catch (error) {
      next(error);
  }
});

// GET /api/snippets/:id - Get a single snippet
router.get("/snippets/:id", async (req, res, next) => {
  try {
      const snippet = await Snippet.findById(req.params.id).populate("createdBy", "name");
      if (!snippet) return res.status(404).json({message: "Snippet not found"});
      res.json(snippet);
  } catch (error) {
      next(error);
  }
});

// PUT /api/snippets/:id - Update a snippet (protected, only accessible by the owner of the snippet)
router.put("/snippets/:id", isAuthenticated, async (req, res, next) => {
  try {
      const snippet = await Snippet.findById(req.params.id);
      if (!snippet) return res.status(404).json({message: "Snippet not found"});
      if (snippet.createdBy.toString() !== req.payload._id) return res.status(403).json({message: "You can only edit your own snippets"});
  
  const updatedSnippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.json(updatedSnippet);
  } catch (error) {
      next(error);
  }
});

// DELETE /api/snippets/:id - Delete a snippet (also protected same way as update snippet call)
router.delete("/snippets/:id", isAuthenticated, async (req, res, next) => {
  try {
  const snippet = await Snippet.findById(req.params.id);
  if (!snippet) return res.status(404).json({message: "Snippet not found"});
  if (snippet.createdBy.toString() !== req.payload._id) return res.status(403).json({message: "You can only delete your own snippets"});
  await Snippet.findByIdAndDelete(req.params.id);
  res.status(204).send();
  } catch (error) {
      next(error);
  }
});

module.exports = router;
