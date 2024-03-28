//jobPostRoutes.js

const express = require("express");
const router = express.Router();
const JobPost = require("../models/jobPost");
const authMiddleware = require("./authMiddleware");

// Create a new job post
router.post("/jobpost", authMiddleware, async (req, res) => {
  try {
    const jobPost = new JobPost({
      ...req.body,
      postedBy: req.userData.userId,
    });
    const savedJobPost = await jobPost.save();
    res.status(201).json(savedJobPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all job posts
router.get("/jobposts", async (req, res) => {
  const { searchTerm, location } = req.query;

  // filter object based on the parameters passed:
  let filter = { isDeleted: false };
  if (searchTerm) {
    filter.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { company: { $regex: searchTerm, $options: "i" } },
    ];
  }

  if (location) {
    // If there's already an $or condition (from searchTerm), we need to make sure location is added outside of $or
    if (!filter.$or) {
      filter.location = { $regex: location, $options: "i" };
    } else {
      // If both searchTerm and location are provided, we add location as an additional condition
      // jobs matching the searchTerm OR location
      filter.$or.push({ location: { $regex: location, $options: "i" } });
    }
  }
  try {
    // find all jobs where isDeleted is not true
    console.log("Filter used for querying:", filter);

    const jobPosts = await JobPost.find(filter);
      //.sort({ createdAt: -1 });
    // const filteredJobPosts = jobPosts.filter(({ isDeleted }) => !isDeleted);
    res.json(jobPosts);
    // console.log(filteredJobPosts);
    console.log(jobPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single job post
router.get("/jobpost/:id", async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);
    if (jobPost) {
      res.json(jobPost);
    } else {
      res.status(404).json({ message: "Job Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a job post
router.put("/jobpost/:id", authMiddleware, async (req, res) => {
  try {
    const updatedJobPost = await JobPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedJobPost) {
      res.json(updatedJobPost);
    } else {
      res.status(404).json({ message: "Job Post not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a job post
router.delete("/jobpost/:id", authMiddleware, async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.id);
    job.isDeleted = true;
    job.deletedAt = new Date();
    await job.save();
    res.status(200).send("Job marked as deleted.");
  } catch (error) {
    res.status(500).send("Error deleting the job.");
  }
});

//restore a deleted job:
router.post("/jobpost/restore/:id", async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.id);
    job.isDeleted = false;
    job.deletedAt = null;
    await job.save();
    res.status(200).send("Job restored.");
  } catch (error) {
    res.status(500).send("Error restoring the job.");
  }
});

module.exports = router;
