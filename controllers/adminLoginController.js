const Username = process.env.ADMIN_USERNAME;
const Password = process.env.ADMIN_PASSWORD;

const adminLoginPage = (req, res) => {
  res.render("./Admin/adminLogin.ejs");
};

const adminLogin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.redirect("/admin/loginPage");
  }
  if (username === Username && password === Password) {
    req.session.user = {
      username,
    };
    return res.redirect("/admin/home");
  } else {
    res.redirect("/admin/loginPage");
  }
};

module.exports = { adminLoginPage, adminLogin };
