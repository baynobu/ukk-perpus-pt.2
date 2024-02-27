import db from "../config/Database.js";
import { store } from "../index.js";
import Borrows from "./PeminjamanModel.js";
import  Books from "./BukuModel.js";
import Users from "./UserModel.js";
import Collections from "./KoleksiPribadiModel.js";
import Ratings from "./UlasanBukuModel.js";
import Categories from "./KategoriBukuModel.js";
import CategoriesRelation from "./KategoriBuku_RelasiModel.js";

(async () => {
  try {
    await Books.sync({ force: true });
    console.log("Table Books created successfully");

    await Users.sync({ force: true });
    console.log("Table Users created successfully");

    await Borrows.sync({ force: true });
    console.log("Table Borrow created successfully");

    await Collections.sync({ force: true });
    console.log("Table Collection created successfully");

    await Ratings.sync({ force: true });
    console.log("Table Ratings created successfully");

    await Categories.sync({ force: true });
    console.log("Table Categories created successfully");

    await CategoriesRelation.sync({ force: true });
    console.log("Table CategoriesRelation created successfully");

  } catch (error) {
    console.error("Error creating table Borrow:", error);
  }
})();

