const path = require("path");
const fs = require("fs");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const forgotPasswordRoutes = require("./routes/forgotPassword");

const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/orders");
const ForgotPassword = require("./models/forgotPassword");
const FileLinks = require("./models/fileLinks");

const sequelize = require("./util/database");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

dotenv.config({ path: "./.env" });
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(cors());
app.use(express.json({ extended: false }));

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

User.hasMany(FileLinks);
FileLinks.belongsTo(User);

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`App is running at port 4000`);
  });
});
