import Borrows from "../models/PeminjamanModel.js";
import User from "../models/UserModel.js";
import Books from "../models/BukuModel.js";

export const getBorrow = async (req, res) => {
  try {
    let response;
    response = await Borrows.findAll({
      where: {
        StatusPeminjaman: "Borrowed",
      },
      attributes: [
        "PeminjamanId",
        "userId",
        "BukuId",
        "TanggalPeminjaman",
        "TanggalPengembalian",
        "StatusPeminjaman"
      ],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["Username"],
        },
        {
          model: Books,
          as: "book",
          attributes: ["Judul"],
        },
      ],
    });

    const formattedResponse = response.map((borrow) => ({
      PeminjamanId: borrow.PeminjamanId,
      StatusPeminjaman: borrow.StatusPeminjaman,
      TanggalPeminjaman: borrow.TanggalPeminjaman,
      TanggalPengembalian: borrow.TanggalPengembalian,
      userId: {
        userId: borrow.userId,
        Nama: borrow.user.Username,
      },
      BukuId: {
        BukuId: borrow.BukuId,
        Judul: borrow.book.Judul,
      },
    }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBorrowReturned = async (req, res) => {
  try {
    let response;
    response = await Borrows.findAll({
      where: {
        StatusPeminjaman: "Returned",
      },
      attributes: [
        "PeminjamanId",
        "userId",
        "BukuId",
        "TanggalPeminjaman",
        "TanggalPengembalian",
        "StatusPeminjaman"
      ],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["Username"],
        },
        {
          model: Books,
          as: "book",
          attributes: ["Judul"],
        },
      ],
    });

    const formattedResponse = response.map((borrow) => ({
      PeminjamanId: borrow.PeminjamanId,
      StatusPeminjaman: borrow.StatusPeminjaman,
      TanggalPeminjaman: borrow.TanggalPeminjaman,
      TanggalPengembalian: borrow.TanggalPengembalian,
      userId: {
        userId: borrow.userId,
        Nama: borrow.user.Username,
      },
      BukuId: {
        BukuId: borrow.BukuId,
        Judul: borrow.book.Judul,
      },
    }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserBorrowHistory = async (req, res) => {
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
      const borrowHistory = await Borrows.findAll({
        where: {
          userId: user.id,
        },
        include: [
          {
            model: User,
            attributes: ['name'], 
          },
          {
            model: Books,
            attributes: ['title'],
          },
        ],
      });
  
      res.status(200).json(borrowHistory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', error});
    }
  };
  
  
