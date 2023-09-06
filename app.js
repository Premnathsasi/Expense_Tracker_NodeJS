const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const forgotPasswordRoutes = require("./routes/forgotPassword");

const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/orders");
const ForgotPassword = require("./models/forgotPassword");

const sequelize = require("./util/database");

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));
dotenv.config({ path: "./.env" });

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/password", forgotPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(4000, () => {
      console.log(`App is running at port 4000`);
    });
  });
