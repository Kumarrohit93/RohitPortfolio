const task = require("../models/taskModel.js");
const AppError = require("../utils/ExpressError");
const taskCompletion = require("../models/taskCompletationModel.js");
const projects = require("../models/projectModel.js");
const reviews = require("../models/review.js");
const blogs = require("../models/blogModel.js");

const taskPage = async (req, res) => {
  const taskData = await task.find({});
  res.render("./Admin/task.ejs", { taskData });
};

const createTask = async (req, res) => {
  const { title, category } = req.body;

  if (!title || !category) {
    throw new AppError("credentials missing!", 404);
  }

  const data = new task({
    title,
    category,
  });

  await data.save();

  res.redirect("/admin/task");
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  await task.findByIdAndDelete(id);
  res.redirect("/admin/task");
};

function normalDate(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

const getDashboard = async (req, res) => {
  const project = await projects.find({});
  const reviewData = await reviews.find({});
  const blog = await blogs.find({});

  const tasks = await task.find();
  const today = normalDate(new Date());

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const completions = await taskCompletion.find({
    date: { $gte: monthStart, $lte: monthEnd },
  });

  const completionMap = {};

  completions.forEach((c) => {
    const key = `${c.taskId}_${normalDate(c.date).getTime()}`;
    completionMap[key] = true;
  });

  const days = [];
  for (let d = 1; d <= monthEnd.getDate(); d++) {
    days.push(new Date(today.getFullYear(), today.getMonth(), d));
  }

  const now = new Date();

  const startOfToday = new Date(now.setHours(0, 0, 0, 0));

  const startOfWeek = new Date();
  startOfWeek.setDate(now.getDate() - now.getDay());

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const totalTasks = await task.countDocuments();
  const todayCompleted = await taskCompletion.countDocuments({
    date: { $gte: startOfToday },
  });

  const todayTotal = totalTasks;

  const todayPercent =
    totalTasks === 0 ? 0 : Math.round((todayCompleted / todayTotal) * 100);

  const weekCompleted = await taskCompletion.countDocuments({
    date: { $gte: startOfWeek },
  });

  const weekTotal = totalTasks * (now.getDay() + 1);

  const weekPercent =
    weekTotal === 0 ? 0 : Math.round((weekCompleted / weekTotal) * 100);

  const daysPassed = now.getDate();

  const monthCompleted = await taskCompletion.countDocuments({
    date: { $gte: startOfMonth },
  });

  const monthTotal = totalTasks * daysPassed;

  const monthPercent =
    monthTotal === 0 ? 0 : Math.round((monthCompleted / monthTotal) * 100);

  res.render("./Admin/home.ejs", {
    project,
    reviewData,
    blog,
    tasks,
    days,
    completionMap,
    today: today.getTime(),
    todayCompleted,
    todayPercent,
    weekCompleted,
    weekPercent,
    monthCompleted,
    monthPercent,
  });
};

const completeTask = async (req, res) => {
  const taskId = req.params.id;
  const today = normalDate(new Date());

  const exist = await taskCompletion.findOne({ taskId, date: today });

  if (!exist) {
    await taskCompletion.create({
      taskId,
      date: today,
      completed: true,
    });
  }

  res.redirect("/admin/home");
};

module.exports = {
  taskPage,
  createTask,
  deleteTask,
  getDashboard,
  completeTask,
};
