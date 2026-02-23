const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        minLength: 1,
        maxLength: 10000,
        required: true
    },
    techStack: {
        type: [String], 
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    liveLink: {
        type: String, 
        required: true
    },
    githubLink: {
        type: String, 
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

const project = mongoose.model("project", projectSchema)

module.exports = project