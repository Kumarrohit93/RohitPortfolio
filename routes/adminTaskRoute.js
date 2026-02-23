const express = require("express");
const router = express.Router();
const {
  taskPage,
  createTask,
  deleteTask,
  getDashboard,
  completeTask,
} = require("../controllers/adminTaskController.js");
const isLoggedIn = require("../middleware/auth.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/task", isLoggedIn, wrapAsync(taskPage));
router.post("/create-task", isLoggedIn, wrapAsync(createTask));
router.delete("/delete/task/:id", isLoggedIn, wrapAsync(deleteTask));
router.get("/home", isLoggedIn, wrapAsync(getDashboard));
router.post("/task/:id/complete", isLoggedIn, wrapAsync(completeTask));
module.exports = router;
