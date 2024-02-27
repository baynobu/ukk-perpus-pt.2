import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Categories from "./KategoriBukuModel.js";
import Books from "./BukuModel.js";

const { DataTypes } = Sequelize;

const CategoriesRelation = db.define("kategoribuku_relasi", {
  KategoriBukuId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  KategoriId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

// Associations
CategoriesRelation.belongsTo(Books, { foreignKey: "BukuId" });
CategoriesRelation.belongsTo(Categories, { foreignKey: "KategoriId" });

export default CategoriesRelation;
