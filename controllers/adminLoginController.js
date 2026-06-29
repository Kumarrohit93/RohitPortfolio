const adminLoginPage = (req, res) => {
  res.render("./Admin/adminLogin.ejs");
};

const adminLogin = async (req, res, next) => {
  require('dotenv').config();
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  const { username, password } = req.body;
  if (!username || !password) {
    return res.redirect("/admin/loginPage");
  }
  if (username === expectedUsername && password === expectedPassword) {
    req.session.user = {
      username,
    };
    return res.redirect("/admin/home");
  } else {
    console.log("Login failed: Expected", expectedUsername, "but got", username);
    return res.redirect("/admin/loginPage");
  }
};

module.exports = { adminLoginPage, adminLogin };
