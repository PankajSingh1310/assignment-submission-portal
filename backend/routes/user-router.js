const express = require("express");
const { userRegister, userLogin, uploadAssignment, getAllAdmins } = require("../controllers/user-controller");
const isLoggedIn = require("../middlewares/auth-middleware")

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/upload", isLoggedIn, uploadAssignment);
router.get("/admins", isLoggedIn, getAllAdmins);

module.exports = router;