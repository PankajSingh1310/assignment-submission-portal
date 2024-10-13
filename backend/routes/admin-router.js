const express = require("express");
const { adminRegister, adminLogin, getTaggedAssignments, rejectAssignment, acceptAssignment } = require("../controllers/admin-controller");
const isLoggedIn = require("../middlewares/auth-middleware");

const router = express.Router();

router.post("/register", adminRegister)
router.post("/login", adminLogin)
router.get("/assignments", isLoggedIn, getTaggedAssignments)
router.post("/assignments/:id/reject", isLoggedIn, rejectAssignment)
router.post("/assignments/:id/accept", isLoggedIn, acceptAssignment)

module.exports = router;