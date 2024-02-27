import { Sequelize } from "sequelize";
import db from "../config/Database.js";

import Users from "./UserModel.js";
import Books from "./BukuModel.js";

const { DataTypes } = Sequelize;

const Borrows = db.define("peminjaman", {
  PeminjamanId: {
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
  TanggalPeminjaman: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  TanggalPengembalian: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  StatusPeminjaman: {
    type: DataTypes.STRING,
    defaultValue: 'Borrowed',
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
});

// Associations
Borrows.belongsTo(Users, { foreignKey: "userId" });
Borrows.belongsTo(Books, { foreignKey: "BukuId" });

export default Borrows;
