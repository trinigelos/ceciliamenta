//jobPost.js

const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: {type: String},
    location: {type: String},
    description: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    salaryRange: { type: String },
    employmentType: { type: String },
    employmentStyle: { type: String },
    applicationDeadline: { type: Date },
    contactEmail: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
});

const JobPost = mongoose.model('Job Post', jobPostSchema);

module.exports = JobPost;

