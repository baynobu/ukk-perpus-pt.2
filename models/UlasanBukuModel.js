import { Sequelize } from "sequelize";
import db from "../config/Database.js";

import Users from "./UserModel.js";
import Books from "./BukuModel.js";

const { DataTypes } = Sequelize;

const Ratings = db.define("ulasanbuku", {
  UlasanId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  BukuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  Ulasan: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  Rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

// Associations
Ratings.belongsTo(Users, { foreignKey: "userId" });
Ratings.belongsTo(Books, { foreignKey: "BukuId" });

export default Ratings;
