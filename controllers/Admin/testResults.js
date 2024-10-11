const User = require("../../models/DriveTest");

module.exports = async (req, res) => {
  console.log(req.session.userId);
  const user = await User.find({
    testResult: { $exists: true },
  });

  console.log(user);
  res.render("testResult", { user });
};
