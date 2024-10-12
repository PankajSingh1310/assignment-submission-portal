const express = require("express");
const { adminRegister } = require("../controllers/admin-controller");

const router = express.Router();

router.post("/register", adminRegister)

module.exports = router;