const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user");
const sequelize = require("./util/database");

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

app.use("/user", userRoutes);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(4000, () => {
      console.log(`App is running at port 4000`);
    });
  });
