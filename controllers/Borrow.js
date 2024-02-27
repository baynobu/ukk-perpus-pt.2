import Borrows from "../models/PeminjamanModel.js";
import User from "../models/UserModel.js";
import { DATE, DATEONLY, NOW, Op } from "sequelize";
import sequelize from "sequelize";
import Books from "../models/BukuModel.js";

async function checkBookAvailability(bookId) {
    const existingBorrow = await Borrows.findOne({
      where: {
        BukuId: bookId,
        StatusPeminjaman: {
          [Op.not]: "Returned",
        },
      },
    });
  
    if (existingBorrow) {
      throw new Error("Book is already borrowed");
    }
  }
  
  export const createRequest = async (req, res) => {
    const { TanggalPengembalian, bookId } = req.body;
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
      await checkBookAvailability(bookId);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  
    try {
      const borrow = await Borrows.create({
        TanggalPeminjaman: DATEONLY(NOW),
        TanggalPengembalian: TanggalPengembalian,
        userId: user.id, // Menggunakan ID user yang sudah ditemukan
        BukuId: bookId,
      });
  
      console.log(borrow);
      res.status(201).json({ message: "Success", borrow });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };

export const returnBook = async (req, res) => {
  const { id } = req.params; // Menggunakan params untuk mendapatkan borrowingId dari URL

  try {
    // Mencari entitas peminjaman berdasarkan borrowingId
    const borrow = await Borrows.findOne({
      where: {
        PeminjamanId: id,
        StatusPeminjaman: "Borrowed", // Memastikan buku sedang dipinjam sebelum dikembalikan
      },
    });

    if (!borrow) {
      return res
        .status(404)
        .json({ error: "Borrowing record not found or book is not borrowed" });
    }

    // Mencari buku berdasarkan bookId
    const book = await Books.findOne({
      where: { BukuId: borrow.BukuId },
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Mengubah nilai kolom book_status dalam tabel Books menjadi 'Available' karena buku dikembalikan
    // await Books.update(
    //   { book_status: "Available" },
    //   { where: { id: borrow.bookId } }
    // );

    // Mengupdate tanggal pengembalian
    await borrow.update({
      TanggalPengembalian: DATEONLY(NOW),
      StatusPeminjaman: "Returned",
    });

    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
