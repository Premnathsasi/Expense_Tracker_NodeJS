const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const FileLinks = sequelize.define("filelink", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fileUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = FileLinks;
