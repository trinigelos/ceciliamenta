// //categoryRoutes.js

// const express = require("express");
// const router = express.Router();
// const Category = require("../models/category");
// const authMiddleware = require("./authMiddleware");

// // Create a new category
// router.post("/category", authMiddleware, async (req, res) => {
//   try {
//     const category = new Category(req.body);
//     const savedCategory = await category.save();
//     res.status(201).json(savedCategory);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Get all categories
// router.get("/categories", async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Update a category
// router.put("/category/:id", authMiddleware, async (req, res) => {
//   try {
//     const updatedCategory = await Category.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (updatedCategory) {
//       res.json(updatedCategory);
//     } else {
//       res.status(404).json({ message: "Category not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete a category
// router.delete("/category/:id", authMiddleware, async (req, res) => {
//   try {
//     const deletedCategory = await Category.findByIdAndDelete(req.params.id);
//     if (deletedCategory) {
//       res.json({ message: "Category deleted successfully" });
//     } else {
//       res.status(404).json({ message: "Category not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
