import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import argon2 from "argon2";

async function hashPassword(password) {
    try {
      const hashedPassword = await argon2.hash(password);
      return hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      throw error;
    }
  }

  

async function main() {
  const now = new Date();
  await prisma.users.create({
    data: {
        Username: "admin",
        Email: "admin@example.com",
        Password: await hashPassword('admin'),
        NamaLengkap: "admin smechatwolasma",
        Alamat: "Indonesia", 
        role: "Admin",
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        Username: "pustakawan",
        Email: "pustakawan@example.com",
        Password: await hashPassword('pustakawan'),
        NamaLengkap: "pustakawan smechatwolasma",
        Alamat: "Indonesia",
        role: "Librarian",
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        Username: "user1",
        Email: "user1@example.com",
        Password: await hashPassword('user1'),
        NamaLengkap: "user1 smechatwolasma",
        Alamat: "Indonesia",
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        Username: "user2",
        Email: "user2@example.com",
        Password: await hashPassword('user2'),
        NamaLengkap: "user2 smechatwolasma",
        Alamat: "Indonesia",
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        Username: "user3",
        Email: "user3@example.com",
        Password: await hashPassword('user3'),
        NamaLengkap: "user3 smechatwolasma",
        Alamat: "Indonesia",
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        Username: "user4",
        Email: "user4@example.com",
        Password: await hashPassword('user4'),
        NamaLengkap: "user4 smechatwolasma",
        Alamat: "Indonesia",
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        Username: "user5",
        Email: "user5@example.com",
        Password: await hashPassword('user5'),
        NamaLengkap: "user5 smechatwolasma",
        Alamat: "Indonesia",
        createdAt: now,
        updatedAt: now
    },
  });
  await prisma.users.create({
    data: {
        Username: "user6",
        Email: "user6@example.com",
        Password: await hashPassword('user6'),
        NamaLengkap: "user6 smechatwolasma",
        Alamat: "Indonesia",
        createdAt: now,
        updatedAt: now
    },
  });
  console.log("success create Users");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
