import Book from "../models/BukuModel.js";

export const getBooks = async (req, res) => {
  try {
    let response;
    response = await Book.findAll({
      attributes: [
        "BukuId",
        "Judul",
        "Penulis",
        "Penerbit",
        "TahunTerbit",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const { Judul, Penulis, Penerbit, TahunTerbit } = req.body;

    const newBook = await Book.create({
      Judul: Judul,
      Penulis: Penulis,
      Penerbit: Penerbit,
      TahunTerbit: TahunTerbit,
    });

    res.status(201).json({ msg: "Book Created Successfully", book: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: {
        BukuId: req.params.id,
      },
    });
    if (!book) return res.status(404).json({ msg: "Data not found" });
    const { Judul, Penulis, Penerbit, TahunTerbit } = req.body;
    await Book.update(
      { Judul, Penulis, Penerbit, TahunTerbit },
      {
        where: {
          BukuId: book.BukuId,
        },
      }
    );
    res.status(200).json({ msg: "Book updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: {
        BukuId: req.params.id,
      },
    });
    if (!book) return res.status(404).json({ msg: "Data not found" });
    await Book.destroy({
      where: {
        BukuId: book.BukuId,
      },
    });
    res.status(200).json({ msg: "Book deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//--- id - code - cover - title - author
// - publisher - publication_year
// - description - book_status - information
