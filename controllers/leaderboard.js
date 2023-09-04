const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("../util/database");

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboardofusers = await User.findAll({
      attributes: [
        "id",
        "name",
        [
          sequelize.fn("sum", sequelize.col("expenses.expenseamount")),
          "totalCost",
        ],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ["user.id"],
      order: [["totalCost", "DESC"]],
    });

    return res.status(200).json(leaderboardofusers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
