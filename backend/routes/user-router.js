const express = require("express");
const { userRegister, userLogin, uploadAssignment } = require("../controllers/user-controller");

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/upload", uploadAssignment);

module.exports = router;