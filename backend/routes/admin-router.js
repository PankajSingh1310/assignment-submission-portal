const express = require("express");
const { adminRegister } = require("../controllers/admin-controller");

const router = express.Router();

router.get("/register", adminRegister)

module.exports = router;