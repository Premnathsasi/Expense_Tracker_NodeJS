const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const leaderboardRoutes = require("./routes/leaderboard");

const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/orders");

const sequelize = require("./util/database");

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));
dotenv.config({ path: "./.env" });

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", leaderboardRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(4000, () => {
      console.log(`App is running at port 4000`);
    });
  });
