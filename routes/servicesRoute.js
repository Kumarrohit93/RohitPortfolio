const express = require("express")
const router = express.Router()
const service = require("../controllers/servicesController.js")
const wrapAsync = require("../utils/wrapAsync.js")

router.get("/services", wrapAsync(service))

module.exports = router