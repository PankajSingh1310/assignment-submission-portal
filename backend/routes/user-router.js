const express = require("express");
const { userRegister } = require("../controllers/user-controller");

const router = express.Router();

router.get("/register", userRegister)

module.exports = router;