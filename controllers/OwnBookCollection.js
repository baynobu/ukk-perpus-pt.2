import User from "../models/UserModel.js";
import Ratings from "../models/UlasanBukuModel.js";
import sequelize from "sequelize";
import Books from "../models/BukuModel.js";
import Collections from "../models/KoleksiPribadiModel.js";

export const createCollection = async (req, res) => {
  const { bookId } = req.body;
  const userUuid = req.session.userId;

  // Mencari user berdasarkan UUID
  const user = await User.findOne({
    where: { uuid: userUuid },
  });

  const book = await Books.findOne({
    where: { BukuId: bookId },
  });

  if (!book) {
    return res.status(404).json({ msg: "Book not found" });
  }

  try {
    // Menggunakan ID user yang sudah ditemukan
    const collection = await Collections.create({
      userId: user.id, // Menggunakan ID user yang sudah ditemukan
      BukuId: bookId,
    });
    console.log(collection);

    res.status(201).json({ message: "Success", collection });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getUserCollection = async (req, res) => {
    try {
      const userUuid = req.session.userId;
  
      // Mencari user berdasarkan UUID
      const user = await User.findOne({
        where: { uuid: userUuid },
      });
  
      // Memeriksa apakah user ditemukan
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Mencari riwayat peminjaman berdasarkan userId
      const bookCollection = await Collections.findAll({
        where: {
          userId: user.id,
        },
        include: [
          {
            model: User,
            attributes: ['Username'], 
          },
          {
            model: Books,
            attributes: ['Judul'],
          },
        ],
      });
  
      res.status(200).json(bookCollection);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', error});
    }
  };

  export const deleteCollection = async (req, res) => {
    try {
      const collection = await Collections.findOne({
        where: {
          KoleksiId: req.params.id,
        },
      });
      if (!collection) return res.status(404).json({ msg: "Data not found" });
      await Collections.destroy({
        where: {
          KoleksiId: collection.KoleksiId,
        },
      });
      res.status(200).json({ msg: "collection deleted successfuly" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  