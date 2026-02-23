const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO3tztTdVlqzGq3BAIvmnuuucQ4yXLMb-seg&s"
    },
    feedback: {
        type: String,
        minLength: 10,
        maxLength: 300,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, {timestamps: true})

const reviewModel = mongoose.model("review", reviewSchema)

module.exports = reviewModel