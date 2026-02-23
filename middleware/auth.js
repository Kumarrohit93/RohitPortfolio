const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/admin/loginPage");
  }
  next();
};

module.exports = isLoggedIn