const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");

router.get("/", authController.protect, authController.getUserFromToken);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get('/me', authController.isUserLoggedIn)

module.exports = router;
