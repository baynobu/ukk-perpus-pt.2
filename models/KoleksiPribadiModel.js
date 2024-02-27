import { Sequelize } from "sequelize";
import db from "../config/Database.js";

import Users from "./UserModel.js";
import Books from "./BukuModel.js";

const { DataTypes } = Sequelize;

const Collections = db.define("koleksipribadi", {
  KoleksiId: {
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
});

// Associations
Collections.belongsTo(Users, { foreignKey: "userId" });
Collections.belongsTo(Books, { foreignKey: "BukuId" });

export default Collections;
