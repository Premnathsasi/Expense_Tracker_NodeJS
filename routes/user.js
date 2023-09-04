const express = require("express");

const userController = require("../controllers/user");
const middleware = require("../middleware/auth");

const router = express.Router();

router.post("/signup", userController.postSignUp);
router.post("/login", userController.postLogin);
router.get("/getUser", middleware.authenticate, userController.getUser);

module.exports = router;
