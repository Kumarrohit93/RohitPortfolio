require("dotenv").config()
const express = require("express");
const app = express();
const port = 4545;
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session")
const dbUrl = process.env.MONGODB_URL
const methodOverride = require("method-override")
const homeRoute = require("./routes/homeRoute.js");
const dashboardRoute = require("./routes/adminLoginRoute.js");
const myWorkRoute = require("./routes/myWorkRoute.js");
const serviceRoute = require("./routes/servicesRoute.js");
const adminBlogRoute = require("./routes/adminBlogRoute.js");
const blogRoute = require("./routes/blogRoute.js")
const adminLogoutRoute = require("./routes/adminLogoutRoute.js")
const adminProjectRoute = require("./routes/adminProjectRoute.js")
const adminReviewRoute = require("./routes/adminReviewRoute.js")
const adminTaskRoute = require("./routes/adminTaskRoute.js")

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  }),
)

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static("public"));

app.use("/", homeRoute);
app.use("/", myWorkRoute);
app.use("/", serviceRoute);
app.use("/", blogRoute);
app.use("/admin", dashboardRoute);
app.use("/admin", adminBlogRoute);
// app.use("/admin", adminHomeRoute)
app.use("/admin", adminLogoutRoute)
app.use("/admin", adminProjectRoute)
app.use("/admin", adminReviewRoute)
app.use("/admin", adminTaskRoute)

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
