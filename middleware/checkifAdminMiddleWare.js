const User = require("../models/DriveTest");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId).exec();
    if (!user || user.role !== "Admin") {
      req.session.message = "Login before accessing Admin portal";
      return res.redirect("/login");
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while checking the user session");
  }
};
