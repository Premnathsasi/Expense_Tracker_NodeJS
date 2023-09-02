const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const User = require("./models/user");
const Expense = require("./models/expense");

const sequelize = require("./util/database");

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(4000, () => {
      console.log(`App is running at port 4000`);
    });
  });
