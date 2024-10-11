const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
const flash = require("connect-flash");
const ejs = require("ejs");
app.set("view engine", "ejs");
app.listen(5000, () => {
  console.log("App listening on port 5000");
});
const expressSession = require("express-session");
app.use(flash());
app.use(
  expressSession({
    secret: "panipuri",
  })
);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://sanklechanidhi02:fx7_w~FW9hf^~mH@cluster0.sbwuwhw.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp",
  { useNewUrlParser: true }
);

const dashboardController = require("./controllers/dashboard.js");
const loginController = require("./controllers/login.js");
const G2PageController = require("./controllers/Driver/g2_page.js");
const GPageController = require("./controllers/Driver/g_page.js");
const appointmentController = require("./controllers/Admin/appointment.js");
const newAppointmentController = require("./controllers/Admin/newAppointment.js");
const signUpController = require("./controllers/signup.js");
const updateUserController = require("./controllers/Driver/updateUser.js");
const newUserController = require("./controllers/newUser.js");
const loginUserController = require("./controllers/loginUser.js");
const logoutController = require("./controllers/logout.js");
const appointmentListController = require("./controllers/Driver/showAppointmentList.js");
const validateMiddleWare = require("./middleware/validateMiddleWare.js");
const checkIfDriverMiddleWare = require("./middleware/checkIfDriverMiddleWare.js");
const checkIfAdminMiddleWare = require("./middleware/checkifAdminMiddleWare.js");
const checkIfExaminerMiddleWare = require("./middleware/checkIfExaminerMiddleWare.js");
const examinerShowBookedAppointmentController = require("./controllers/Examiner/showBookedAppointment.js");
const addExaminerController = require("./controllers/Examiner/addExaminer.js");
const currentAppointmentController = require("./controllers/Examiner/currentAppointment.js");
const postResultController = require("./controllers/Examiner/postResult.js");
const testResultsController = require("./controllers/Admin/testResults.js");
const updateUserAppointmentController = require("./controllers/Driver/updateUserAppointment.js");

global.loggedIn = null;
global.userType = null;
global.message = null;
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  userType = req.session.userType;
  message = req.session.message;
  next();
});

app.get("/", dashboardController);
app.get("/login", loginController);
app.get("/g2_test", checkIfDriverMiddleWare, G2PageController);
app.get("/g_test", checkIfDriverMiddleWare, GPageController);
app.get(
  "/showAppointmentList",
  checkIfDriverMiddleWare,
  appointmentListController
);
app.get("/appointment", checkIfAdminMiddleWare, appointmentController);
app.get("/appointment/:date", checkIfAdminMiddleWare, appointmentController);
app.get("/signup", signUpController);
app.get("/logout", logoutController);

app.post("/new/user", newUserController);

app.post("/login/user", loginUserController);

app.use("/g_test/update", validateMiddleWare);
app.post("/g_test/update", checkIfDriverMiddleWare, updateUserController);

app.post("/new/appointment", checkIfAdminMiddleWare, newAppointmentController);
app.get("/testResults", checkIfAdminMiddleWare, testResultsController);
app.get(
  "/showBookedAppointment",
  checkIfExaminerMiddleWare,
  examinerShowBookedAppointmentController
);
app.get(
  "/examiners/showBookedAppointment/:filterType",
  checkIfExaminerMiddleWare,
  examinerShowBookedAppointmentController
);
app.get(
  "/currentAppointment",
  checkIfExaminerMiddleWare,
  currentAppointmentController
);
app.get(
  "/examiners/currentAppointment/:filterType",
  checkIfExaminerMiddleWare,
  currentAppointmentController
);

app.post("/addExaminer", checkIfExaminerMiddleWare, addExaminerController);

app.post("/post/result", checkIfExaminerMiddleWare, postResultController);
app.post(
  "/update/user_appointment",
  checkIfAdminMiddleWare,
  updateUserAppointmentController
);
