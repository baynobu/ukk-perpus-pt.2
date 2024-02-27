import User from "../models/UserModel.js";
import Ratings from "../models/UlasanBukuModel.js";
import sequelize from "sequelize";
import Books from "../models/BukuModel.js";

export const createReview = async (req, res) => {
  const { Ulasan, Rating, bookId } = req.body;
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
    const rating = await Ratings.create({
      Rating: Rating,
      Ulasan: Ulasan,
      userId: user.id, // Menggunakan ID user yang sudah ditemukan
      BukuId: bookId,
    });
    console.log(rating);

    res.status(201).json({ message: "Success", rating });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    let response;
    response = await Ratings.findOne({
      where: {
        UlasanId: req.params.id,
      },
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

    const formattedResponse = (Rating) => ({
      UlasanId: Rating.UlasanId,
      Ulasan: Rating.Ulasan,
      Rating: Rating.Rating,
      userId: {
        userId: Rating.userId,
        Nama: Rating.user.Username,
      },
      BukuId: {
        BukuId: Rating.BukuId,
        Judul: Rating.book.Judul,
      },
    });

    res.status(200).json(formattedResponse(response));
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
