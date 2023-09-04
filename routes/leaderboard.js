const express = require("express");

const auth = require("../middleware/auth");
const leaderboardController = require("../controllers/leaderboard");

const router = express.Router();

router.get(
  "/getleaderboard",
  auth.authenticate,
  leaderboardController.getLeaderboard
);

module.exports = router;
