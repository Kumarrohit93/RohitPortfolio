const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    content: {
      type: String,
      required: true,
    },

    excerpt: {
      type: String,
    },

    coverImage: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNKOYOIjSwAjaHj56dmGNKKRLRLNjxc8HCOg&s"
    },

    author: {
      type: String,
      default: "Rohit Kumar",
    },

    tags: [
      {
        type: String,
      },
    ],

    category: {
      type: String,
    },

    readTime: {
      type: Number,
    },

    views: {
      type: Number,
      default: 0,
    },

    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
