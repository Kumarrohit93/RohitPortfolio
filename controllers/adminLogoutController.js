const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send("Logout Failed", err);
    }

    res.clearCookie("connect.sid")
    res.redirect("/admin/loginPage")
  });
};

module.exports = logout