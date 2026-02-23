const reviews = require("../models/review.js")

const reviewPage  =async(req, res) => {
    const reviewData = await reviews.find({})
    res.render("./Admin/review.ejs", {reviewData})
}

const deleteReview = async(req, res) => {
    const {id} = req.params;

    await reviews.findByIdAndDelete(id)
    res.redirect("/admin/review")
}

module.exports = {deleteReview, reviewPage}