import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  await prisma.books.create({
    data: {
      Judul: "The Lord of the Rings: The Fellowship of the Ring",
      Penulis: "J.R.R. Tolkien",
      Penerbit: "George Allen & Unwin",
      TahunTerbit: new Date("1954-07-29"),
      createdAt: now,
      updatedAt: now,
    },
  });
  await prisma.books.create({
    data: {
      Judul: "The Lord of the Rings: The Two Towers",
      Penulis: "J.R.R. Tolkien",
      Penerbit: "George Allen & Unwin",
      TahunTerbit: new Date("1954-11-11"),
      createdAt: now,
      updatedAt: now,
    },
  });
  await prisma.books.create({
    data: {
      Judul: "The Lord of the Rings: The Return of the King",
      Penulis: "J.R.R. Tolkien",
      Penerbit: "George Allen & Unwin",
      TahunTerbit: new Date("1955-10-20"),
      createdAt: now,
      updatedAt: now,
    },
  });
  await prisma.books.create({
    data: {
      Judul: "The Hobbit",
      Penulis: "J.R.R. Tolkien",
      Penerbit: "George Allen & Unwin",
      TahunTerbit: new Date("1937-09-21"),
      createdAt: now,
      updatedAt: now,
    },
  });
  await prisma.books.create({
    data: {
      Judul: "Harry Potter and the Sorcerer's Stone",
      Penulis: "J.K. Rowling",
      Penerbit: "Bloomsbury Publishing",
      TahunTerbit: new Date("1997-06-26"),
      createdAt: now,
      updatedAt: now,
    },
  });
  await prisma.books.create({
    data: {
      Judul: "Harry Potter and the Chamber of Secrets",
      Penulis: "J.K. Rowling",
      Penerbit: "Bloomsbury Publishing",
      TahunTerbit: new Date("1998-07-02"),
      createdAt: now,
      updatedAt: now,
    },
  });
  await prisma.books.create({
    data: {
      Judul: "Harry Potter and the Prisoner of Azkaban",
      Penulis: "J.K. Rowling",
      Penerbit: "Bloomsbury Publishing",
      TahunTerbit: new Date("1999-07-08"),
      createdAt: now,
      updatedAt: now,
    },
  });

  console.log("success create Books");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
